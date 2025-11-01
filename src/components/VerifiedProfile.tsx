import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { CheckCircle, Shield, Calendar, Mail, Phone } from 'lucide-react';

export function VerifiedProfile() {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#7DF9FF] to-[#4FC3F7] flex items-center justify-center text-white text-2xl shadow-md">
              SJ
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#7DF9FF] rounded-full flex items-center justify-center border-4 border-white">
              <CheckCircle className="w-4 h-4 text-white fill-white" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h2 className="text-gray-900">Sarah Johnson</h2>
                  <Badge className="bg-gradient-to-r from-[#7DF9FF] to-[#4FC3F7] hover:from-[#7DF9FF] hover:to-[#4FC3F7] text-white border-0 text-xs">
                    Verified Organizer
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">Professional Event Manager</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gradient-to-br from-[#7DF9FF]/10 to-[#F4C2C2]/10 rounded-lg p-3 border border-[#7DF9FF]/20">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Shield className="w-4 h-4 text-[#7DF9FF]" />
                  <span className="text-xs">Organizer ID</span>
                </div>
                <p className="text-sm text-gray-900">ORG-2024-5847</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#F4C2C2]/30 to-[#F08080]/10 rounded-lg p-3 border border-[#F08080]/20">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 text-[#F08080]" />
                  <span className="text-xs">Member Since</span>
                </div>
                <p className="text-sm text-gray-900">Jan 2024</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#7DF9FF]/10 to-[#4FC3F7]/10 rounded-lg p-3 border border-[#7DF9FF]/20">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <CheckCircle className="w-4 h-4 text-[#7DF9FF]" />
                  <span className="text-xs">Success Rate</span>
                </div>
                <p className="text-sm text-gray-900">98%</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 rounded-full bg-[#7DF9FF]/20 flex items-center justify-center">
                  <Mail className="w-3 h-3 text-[#7DF9FF]" />
                </div>
                <span className="text-gray-500">Email Verified</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 rounded-full bg-[#F4C2C2]/50 flex items-center justify-center">
                  <Phone className="w-3 h-3 text-[#F08080]" />
                </div>
                <span className="text-gray-500">Phone Verified</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 rounded-full bg-[#7DF9FF]/20 flex items-center justify-center">
                  <Shield className="w-3 h-3 text-[#7DF9FF]" />
                </div>
                <span className="text-gray-500">ID Verified</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
