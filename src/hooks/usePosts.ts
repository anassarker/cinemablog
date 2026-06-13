import { useState, useEffect, useCallback } from 'react';
import type { Post } from '../types';
import { mockPosts } from '../data/mockPosts';

// Firestore helpers - gracefully handle if not configured
const getFirestorePosts = async (): Promise<Post[] | null> => {
  try {
    const { db } = await import('../config/firebase');
    const { collection, getDocs, query, where, orderBy } = await import('firebase/firestore');
    const q = query(
      collection(db, 'posts'),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        createdAt: data.createdAt?.toDate() || null,
        updatedAt: data.updatedAt?.toDate() || null,
        publishedAt: data.publishedAt?.toDate() || null,
      } as Post;
    });
  } catch {
    return null;
  }
};

export const usePosts = (category?: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const firestorePosts = await getFirestorePosts();
      let result = firestorePosts || mockPosts.filter(p => p.status === 'published');

      if (category) {
        result = result.filter(p =>
          p.category.toLowerCase() === category.toLowerCase()
        );
      }

      setPosts(result);
    } catch {
      setError('Failed to load posts');
      setPosts(mockPosts.filter(p => p.status === 'published'));
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
};

export const usePost = (slug: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const { db } = await import('../config/firebase');
        const { collection, query, where, getDocs } = await import('firebase/firestore');
        const q = query(collection(db, 'posts'), where('slug', '==', slug));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const doc = snap.docs[0];
          const data = doc.data();
          setPost({
            ...data,
            id: doc.id,
            createdAt: data.createdAt?.toDate() || null,
            updatedAt: data.updatedAt?.toDate() || null,
            publishedAt: data.publishedAt?.toDate() || null,
          } as Post);
        } else {
          const mock = mockPosts.find(p => p.slug === slug);
          setPost(mock || null);
        }
      } catch {
        const mock = mockPosts.find(p => p.slug === slug);
        setPost(mock || null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

  return { post, loading, error };
};

export const useAllAdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { db } = await import('../config/firebase');
      const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const result = snap.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate() || null,
          updatedAt: data.updatedAt?.toDate() || null,
          publishedAt: data.publishedAt?.toDate() || null,
        } as Post;
      });
      setPosts(result);
    } catch {
      setPosts(mockPosts);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  return { posts, loading, refetch: fetchPosts };
};
