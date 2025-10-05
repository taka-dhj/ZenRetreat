import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Retreat {
  id: string;
  title_ja: string;
  title_en: string;
  location_ja: string;
  location_en: string;
  duration: number;
  price: number;
  capacity: number;
  type: 'domestic' | 'international';
  image: string;
  description_ja: string;
  description_en: string;
  long_description_ja: string;
  long_description_en: string;
  includes_ja: string[];
  includes_en: string[];
  schedule_ja: { time: string; activity: string }[];
  schedule_en: { time: string; activity: string }[];
  display_order: number;
}

export function useRetreats() {
  const [retreats, setRetreats] = useState<Retreat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRetreats();
  }, []);

  async function fetchRetreats() {
    try {
      setLoading(true);
      console.log('Fetching retreats from Supabase...');
      const { data, error } = await supabase
        .from('retreats')
        .select('*')
        .order('display_order');

      console.log('Supabase response:', { data, error });

      if (error) throw error;

      setRetreats(data || []);
    } catch (err) {
      console.error('Error fetching retreats:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch retreats');
    } finally {
      setLoading(false);
    }
  }

  return { retreats, loading, error, refetch: fetchRetreats };
}

export function useRetreat(id: string | undefined) {
  const [retreat, setRetreat] = useState<Retreat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    fetchRetreat();
  }, [id]);

  async function fetchRetreat() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('retreats')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      setRetreat(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch retreat');
    } finally {
      setLoading(false);
    }
  }

  return { retreat, loading, error, refetch: fetchRetreat };
}
