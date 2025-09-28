import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { 
  Code, 
  BookOpen, 
  Trophy, 
  MessageSquare,
  Menu,
  X,
  Zap,
  Target,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

export default function Layout({ children }) {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.log("User not authenticated");
    }
  };

  const navigationItems = [
    {
      title: "Dashboard",
      url: createPageUrl("Dashboard"),
      url: "/dashboard",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Learn",
      url: createPageUrl("Learn"),
      url: "/learn",
      icon: BookOpen,
      color: "text-green-600", 
      bgColor: "bg-green-50"
    },
    {
      title: "Projects",
      url: createPageUrl("Projects"),
      url: "/projects",
      icon: Code,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Challenges",
      url: createPageUrl("Challenges"),
      url: "/challenges",
      icon: Trophy,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Live Chat",
      url: createPageUrl("Chat"),
      url: "/chat",
      icon: MessageSquare,
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 lg:hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CodeQuest
                </h1>
              </div>
            </div>
            {user && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                {user.total_points || 0}
              </Badge>
            )}
          </div>
        </header>

        {/* Sidebar */}
        <Sidebar className="border-r border-slate-200 bg-white/50 backdrop-blur-lg">
          <SidebarHeader className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CodeQuest
                </h2>
                <p className="text-xs text-slate-500">Learn • Build • Challenge</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            {/* User Stats */}
            {user && (
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Welcome back!</span>
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    {user.total_points || 0}
                  </Badge>
                </div>
                <p className="font-semibold text-slate-800 truncate">{user.full_name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-slate-600">
                    {user.learning_streak || 0} day streak
                  </span>
                </div>
              </div>
            )}

            {/* Navigation */}
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                        location.pathname === item.url
                          ? `${item.bgColor} ${item.color} shadow-sm`
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            {/* Quick Stats */}
            {user && (
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Progress</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Lessons</span>
                    <span className="font-medium">{user.completed_lessons?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Projects</span>
                    <span className="font-medium">{user.completed_projects?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Challenges</span>
                    <span className="font-medium">{user.completed_challenges?.length || 0}</span>
                  </div>
                </div>
              </div>
            )}
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 flex flex-col lg:ml-0">
        <main className="flex-1 flex flex-col lg:ml-72">
          <div className="flex-1 overflow-auto pt-16 lg:pt-0">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}