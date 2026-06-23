import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export interface CarouselItem {
  id: string;
  title: string;
  image: string;
  date?: string;
  category?: string;
  badge?: string;
  url: string;
  buttonText: string;
}

interface FeaturedCarouselProps {
  items: CarouselItem[];
  title?: string;
  subtitle?: string;
}

export default function FeaturedCarousel({ items, title = "Featured Content", subtitle = "Explore our latest highlights" }: FeaturedCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    skipSnaps: false
  }, [
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  ]);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  if (!items || items.length === 0) return null;

  return (
    <div className="mb-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h2>
          {subtitle && <p className="text-lg text-slate-500 mt-2">{subtitle}</p>}
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={scrollPrev}
            className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0066FF] hover:border-[#0066FF] hover:shadow-md transition-all z-10 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0066FF] hover:border-[#0066FF] hover:shadow-md transition-all z-10 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex -ml-6">
            {items.map((item, index) => (
              <div 
                key={index} 
                className="pl-6 min-w-0 flex-[0_0_100%] sm:flex-[0_0_80%] lg:flex-[0_0_50%] xl:flex-[0_0_40%]"
              >
                <a href={item.url} className="block h-full group relative">
                  <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-full flex flex-col relative group-hover:shadow-[0_8px_30px_rgb(0,102,255,0.08)] group-hover:border-slate-200 transition-all duration-300">
                    
                    {item.badge && (
                      <div className="absolute top-4 right-4 bg-[#00C853] text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg shadow-[#00C853]/30">
                        {item.badge}
                      </div>
                    )}
                    
                    <div className="h-56 w-full relative overflow-hidden bg-slate-50">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#0066FF]/20 bg-gradient-to-br from-blue-50 to-indigo-50">
                          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center text-sm text-slate-500 mb-4">
                        {item.category && (
                          <>
                            <span className="bg-[#0066FF]/10 text-[#0066FF] px-3 py-1 rounded-full font-medium text-xs">
                              {item.category}
                            </span>
                            {item.date && <span className="mx-2 text-slate-300">•</span>}
                          </>
                        )}
                        {item.date && (
                          <time className="font-medium">
                            {item.date}
                          </time>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#0066FF] transition-colors mb-6 leading-snug">
                        {item.title}
                      </h3>
                      
                      <div className="mt-auto">
                        <span className="inline-flex items-center justify-center w-full bg-slate-50 text-[#0066FF] font-semibold py-3 px-4 rounded-xl group-hover:bg-[#0066FF] group-hover:text-white transition-all duration-300">
                          {item.buttonText}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                index === selectedIndex 
                  ? 'bg-[#0066FF] w-8' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
