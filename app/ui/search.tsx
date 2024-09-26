'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const QUERY_KEY = 'query';
export default function Search({ placeholder }: { placeholder: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query) params.set(QUERY_KEY, query);
    else params.delete(QUERY_KEY);

    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className='relative flex flex-1 flex-shrink-0'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <input
        className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
        placeholder={placeholder}
        defaultValue={searchParams.get(QUERY_KEY) ?? ''}
        onChange={(e) => search(e.target.value)}
      />
      <MagnifyingGlassIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
    </div>
  );
}
