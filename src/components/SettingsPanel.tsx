import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Settings, Bell, Mail, Shield, User, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';

interface SettingsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsPanel({ open, onOpenChange }: SettingsPanelProps) {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    proposalUpdates: true,
    attendeeMessages: false,
    marketingEmails: false
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="account" className="mt-4">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="account" className="data-[state=active]:bg-white">
              <User className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-white">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-white">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  defaultValue="Sarah Johnson"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="sarah.johnson@example.com"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm text-gray-700">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="organization" className="text-sm text-gray-700">Organization</Label>
                <Input
                  id="organization"
                  defaultValue="Tech Events Inc."
                  className="mt-1.5"
                />
              </div>
              <div className="bg-gradient-to-r from-[#7DF9FF]/10 to-[#F4C2C2]/10 border border-[#7DF9FF]/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#7DF9FF] mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900 mb-1">Verified Organizer</p>
                    <p className="text-xs text-gray-600">ID: ORG-2024-5847</p>
                    <p className="text-xs text-gray-500 mt-2">Member since January 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-6">
            {saveSuccess && (
              <Alert className="bg-[#7DF9FF]/10 border-[#7DF9FF]/30">
                <Mail className="w-4 h-4 text-[#7DF9FF]" />
                <AlertDescription className="text-sm text-gray-900">
                  Notification preferences saved successfully!
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-900 mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Email Notifications</p>
                      <p className="text-xs text-gray-500">Receive event updates via email</p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={() => handleToggle('emailNotifications')}
                      className="data-[state=checked]:bg-[#7DF9FF]"
                    />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Event Reminders</p>
                      <p className="text-xs text-gray-500">Get reminders before events start</p>
                    </div>
                    <Switch
                      checked={notifications.eventReminders}
                      onCheckedChange={() => handleToggle('eventReminders')}
                      className="data-[state=checked]:bg-[#7DF9FF]"
                    />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Proposal Updates</p>
                      <p className="text-xs text-gray-500">Notifications about proposal status</p>
                    </div>
                    <Switch
                      checked={notifications.proposalUpdates}
                      onCheckedChange={() => handleToggle('proposalUpdates')}
                      className="data-[state=checked]:bg-[#7DF9FF]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-gray-900 mb-4 mt-6">Other Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Push Notifications</p>
                      <p className="text-xs text-gray-500">Receive push notifications on your device</p>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={() => handleToggle('pushNotifications')}
                      className="data-[state=checked]:bg-[#7DF9FF]"
                    />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Attendee Messages</p>
                      <p className="text-xs text-gray-500">Notifications when attendees message you</p>
                    </div>
                    <Switch
                      checked={notifications.attendeeMessages}
                      onCheckedChange={() => handleToggle('attendeeMessages')}
                      className="data-[state=checked]:bg-[#7DF9FF]"
                    />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Marketing Emails</p>
                      <p className="text-xs text-gray-500">Receive tips and product updates</p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={() => handleToggle('marketingEmails')}
                      className="data-[state=checked]:bg-[#7DF9FF]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password" className="text-sm text-gray-700">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="Enter current password"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="new-password" className="text-sm text-gray-700">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="confirm-password" className="text-sm text-gray-700">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  className="mt-1.5"
                />
              </div>
              
              <div className="bg-[#F4C2C2]/20 border border-[#F08080]/30 rounded-lg p-4 mt-6">
                <h4 className="text-sm text-gray-900 mb-3">Two-Factor Authentication</h4>
                <p className="text-xs text-gray-600 mb-3">Add an extra layer of security to your account</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#F08080] text-[#F08080] hover:bg-[#F08080]/10"
                >
                  Enable 2FA
                </Button>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
                <h4 className="text-sm text-gray-900 mb-2">Active Sessions</h4>
                <p className="text-xs text-gray-600 mb-3">You're currently logged in on 2 devices</p>
                <Button variant="outline" size="sm">
                  Manage Sessions
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-[#7DF9FF] to-[#4FC3F7] hover:from-[#6DE8EE] hover:to-[#3FB2E6] text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
