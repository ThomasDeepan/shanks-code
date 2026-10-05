import React from 'react';
import { Code2 } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import LoginForm from '../components/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <div className="w-full min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 md:py-20 bg-[#F5F6F8]">
      <PageContainer>
        <div className="max-w-md w-full mx-auto">
          <Card
            variant="default"
            className="p-6 sm:p-8 border-slate-200 shadow-subtle bg-white"
          >
            <CardHeader className="text-center p-0 pb-6 space-y-2.5">
              <div className="flex justify-center mb-1">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#1B2A4A] text-white shadow-xs">
                  <Code2 className="w-6 h-6 text-white" aria-hidden="true" />
                </span>
              </div>

              <div className="flex justify-center">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#5C6F97] font-semibold">
                  Student Portal Access
                </div>
              </div>

              <CardTitle as="h1" className="text-2xl sm:text-3xl font-extrabold text-[#1B2A4A] tracking-tight">
                Sign In to Shank's Code
              </CardTitle>

              <CardDescription className="text-xs sm:text-sm text-[#5F5A50] max-w-xs mx-auto leading-relaxed">
                Access your enrolled engineering coursework, syllabus progression, and active learning sessions.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </div>
  );
};

export default LoginPage;
