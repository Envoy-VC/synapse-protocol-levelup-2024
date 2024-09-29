'use client';

import Link from 'next/link';

import React, { memo, useState } from 'react';

import { cn } from '~/lib/utils';

/* eslint-disable @next/next/no-img-element -- safe */

interface CardType {
  title: string;
  image: string;
  href: string;
}

export const Card = memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: CardType;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <Link
      href={card.href}
      className={cn(
        'relative h-60 w-full max-w-md overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ease-out dark:bg-neutral-900 md:h-96',
        hovered !== null && hovered !== index && 'scale-[0.98] blur-sm'
      )}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
    >
      <img
        alt={card.title}
        className='absolute inset-0 h-full w-full object-cover'
        src={card.image}
      />
      <div
        className={cn(
          'absolute inset-0 flex items-end bg-black/50 px-4 py-8 transition-opacity duration-300',
          hovered === index ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className='bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text text-xl font-medium text-transparent md:text-2xl'>
          {card.title}
        </div>
      </div>
    </Link>
  )
);

Card.displayName = 'Card';

export const ConduitCards = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const cards: CardType[] = [
    {
      title: 'Stablecoin',
      href: '/conduits/stablecoin',
      image:
        'https://images.unsplash.com/photo-1542222024-c39e2281f121?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Sudoku',
      href: '/conduits/sudoku',
      image:
        'https://plus.unsplash.com/premium_photo-1723586422579-2d8e7cfd1c06?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHN1ZG9rdSUyMGdhbWV8ZW58MHx8MHx8fDA%3D',
    },
  ];

  return (
    <div className='flex h-screen snap-start flex-col items-center justify-center gap-12'>
      <div className='pb-12 text-center font-eastman text-7xl text-[#DDE4FF]'>
        Conduits
      </div>
      <div className='flex w-full flex-row items-center justify-center gap-8'>
        {cards.map((card, index) => (
          <Card
            key={card.title}
            card={card}
            hovered={hovered}
            index={index}
            setHovered={setHovered}
          />
        ))}
      </div>
    </div>
  );
};
