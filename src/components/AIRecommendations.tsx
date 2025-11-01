import { Event } from '../App';
import { Card, CardContent, CardHeader } from './ui/card';
import { Sparkles, TrendingUp, Users, Calendar, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface AIRecommendationsProps {
  events: Event[];
}

export function AIRecommendations({ events }: AIRecommendationsProps) {
  const recommendations = [
    {
      type: 'timing',
      icon: Calendar,
      title: 'Optimal Timing',
      description: 'Saturday evenings show 40% higher attendance',
      color: 'text-[#7DF9FF]',
      bg: 'bg-[#7DF9FF]/10'
    },
    {
      type: 'capacity',
      icon: Users,
      title: 'Capacity Insight',
      description: 'Consider 25% increase based on trends',
      color: 'text-[#F08080]',
      bg: 'bg-[#F4C2C2]/50'
    },
    {
      type: 'trending',
      icon: TrendingUp,
      title: 'Trending Topics',
      description: 'AI & ML workshops gaining traction',
      color: 'text-[#7DF9FF]',
      bg: 'bg-[#7DF9FF]/10'
    }
  ];

  return (
    <Card className="border-gray-200 shadow-sm h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="p-2 bg-gradient-to-br from-[#7DF9FF]/20 to-[#F4C2C2]/30 rounded-lg">
            <Sparkles className="w-4 h-4 text-[#7DF9FF]" />
          </div>
          <div>
            <h3 className="text-gray-900">AI Insights</h3>
            <p className="text-xs text-gray-500">Smart recommendations</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec, idx) => {
          const Icon = rec.icon;
          return (
            <div 
              key={idx}
              className="bg-gray-50 rounded-lg p-3.5 hover:bg-gradient-to-r hover:from-[#7DF9FF]/5 hover:to-[#F4C2C2]/5 transition-all group cursor-pointer border border-transparent hover:border-[#7DF9FF]/20"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 ${rec.bg} rounded-lg flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${rec.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-900">{rec.title}</p>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#7DF9FF] transition-colors" />
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="pt-3 mt-2 border-t border-gray-200">
          <Button variant="ghost" className="w-full text-sm text-gray-600 hover:text-[#7DF9FF] hover:bg-[#7DF9FF]/5">
            View All Insights
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
