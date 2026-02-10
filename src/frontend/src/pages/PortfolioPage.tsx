import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { portfolioSamples, categories } from '@/config/portfolioSamples';
import PortfolioDetailDialog from '@/components/portfolio/PortfolioDetailDialog';
import type { PortfolioSample } from '@/config/portfolioSamples';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSample, setSelectedSample] = useState<PortfolioSample | null>(null);

  const filteredSamples =
    selectedCategory === 'all'
      ? portfolioSamples
      : portfolioSamples.filter((sample) => sample.category === selectedCategory);

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our latest design work and see what we can create for you
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className={
              selectedCategory === 'all' ? 'bg-gradient-to-r from-chart-1 to-chart-2 text-white' : ''
            }
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category ? 'bg-gradient-to-r from-chart-1 to-chart-2 text-white' : ''
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSamples.map((sample) => (
            <div
              key={sample.id}
              className="group relative overflow-hidden rounded-lg border border-border/40 hover:border-chart-1/40 transition-all cursor-pointer bg-card"
              onClick={() => setSelectedSample(sample)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={sample.imageUrl}
                  alt={sample.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <Badge variant="outline" className="w-fit mb-2 border-chart-1/40 text-chart-1">
                  {sample.category}
                </Badge>
                <h3 className="font-semibold text-lg">{sample.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {filteredSamples.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No samples found in this category.</p>
          </div>
        )}
      </div>

      <PortfolioDetailDialog sample={selectedSample} onClose={() => setSelectedSample(null)} />
    </div>
  );
}
