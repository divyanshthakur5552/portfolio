'use client';

import NavbarDemo from '@/components/navbar-menu-demo';
import ConstrainedLayout from '@/components/ConstrainedLayout';
import Section from '@/components/Section';
import ProfileHeader from '@/components/ProfileHeader';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import PersonalProjectsSection from '@/components/PersonalProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import AchievementsSection from '@/components/AchievementsSection';
import ContactSection from '@/components/ContactSection';
import SpotifyWidget from '@/components/SpotifyWidget';
import { FaSpotify } from 'react-icons/fa';
import { CinematicFooter } from '@/components/ui/motion-footer';
import ProfileCard from '@/components/ui/profile-card';
import { ClipPathLinks } from '@/components/ui/clip-path-links';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';
import { HorizontalDivider } from '@/components/ui/horizontal-divider';
import { TimeGreeting } from '@/components/ui/time-greeting';
import { MagicText } from '@/components/ui/magic-text';
import { GraduationCap, MapPin, Phone, Mail, User, Code } from 'lucide-react';

export default function Home() {
  return (
    <>
      <ConstrainedLayout>
        <NavbarDemo />
        
        <main className="pt-24 relative z-10 bg-[#09090B]">
        {/* Logo Display Section */}
        <div className="relative" id="home">
          {/* Top horizontal line - full width */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
          
          <Section 
            className="flex items-center justify-center py-6 sm:py-8"
            background={
              <DottedGlowBackground
                className="pointer-events-none absolute inset-0"
                opacity={0.6}
                gap={20}
                radius={2}
                color="rgba(39, 39, 42, 0.4)"
                glowColor="rgba(255, 255, 255, 0.6)"
                backgroundOpacity={0}
                speedMin={0.2}
                speedMax={0.8}
                speedScale={1}
              />
            }
          >
            <div className="w-full flex items-center justify-center relative z-10">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Portfolio Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </Section>
          
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Profile Section */}
        <div className="relative" id="about">
          {/* Top horizontal line - full width */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
          
          <Section className="flex items-stretch py-3 sm:py-4">
            <ProfileHeader
              avatar="/profile.png"
              avatarAlt="Divyansh Thakur"
              className="w-full px-4 md:px-6"
            />
          </Section>
          
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Spacing after profile with diagonal lines */}
        <div className="relative h-6 -mx-[50vw] left-1/2 right-1/2 w-screen">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(24, 24, 27, 0.3) 10px,
                rgba(24, 24, 27, 0.3) 11px
              )`
            }}
          ></div>
        </div>

        {/* Spotify Recently Played Section */}
        <div className="relative">
          {/* Top horizontal line - full width */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
          
          <Section className="py-4">
            <div className="max-w-4xl mx-auto px-4 md:px-8 flex items-center">
              {/* Heading on Left */}
              <div className="flex items-center gap-2.5 shrink-0 pr-4 sm:pr-6">
                <FaSpotify className="w-5 h-5 text-[#1ED760]" />
                <h3 className="text-sm sm:text-base font-bold text-white font-sans tracking-tight">
                  Recently Played
                </h3>
              </div>

              {/* Vertical Line Divider */}
              <div className="w-px h-8 bg-[#18181B] shrink-0"></div>

              {/* Open Track Details on Right */}
              <div className="pl-4 sm:pl-6 min-w-0 flex-1">
                <SpotifyWidget />
              </div>
            </div>
          </Section>
          
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Spacing after Spotify with diagonal lines */}
        <div className="relative h-6 -mx-[50vw] left-1/2 right-1/2 w-screen">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(24, 24, 27, 0.3) 10px,
                rgba(24, 24, 27, 0.3) 11px
              )`
            }}
          ></div>
        </div>

        {/* Horizontal line after spacing */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Horizontal Divider with Vertical Lines */}
        <div className="relative py-2">
          <HorizontalDivider 
            lineCount={7}
            spacing={100}
            lineHeight={32}
            color="#18181B"
            lineWidth={2}
          />
        </div>

        {/* Summary Section */}
        <div className="relative">
          {/* Top horizontal line - full width */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
          
          <Section className="py-1">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
              <TimeGreeting className="text-xl md:text-2xl lg:text-3xl font-bold text-white" />
            </div>
          </Section>
          
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Summary Content Section */}
        <div className="relative">
          <Section className="py-8">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
              <MagicText 
                text="B.Tech Computer Science student at CGC (2027) specializing in MERN stack development. I build things — from interactive React frontends with TypeScript to REST API backends — and I thrive in fast-paced environments like hackathons. Currently exploring opportunities in frontend and full-stack engineering."
              />
            </div>
          </Section>
          
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Spacing after summary with diagonal lines */}
        <div className="relative h-8 -mx-[50vw] left-1/2 right-1/2 w-screen">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(24, 24, 27, 0.3) 10px,
                rgba(24, 24, 27, 0.3) 11px
              )`
            }}
          ></div>
        </div>

        {/* Horizontal line after spacing */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

    

        {/* Stack Section */}
        <div className="relative" id="skills">
          <Section className="py-8">
            <SkillsSection showTitle={true} />
          </Section>
          
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Spacing after Stack with diagonal lines */}
        <div className="relative h-8 -mx-[50vw] left-1/2 right-1/2 w-screen">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(24, 24, 27, 0.3) 10px,
                rgba(24, 24, 27, 0.3) 11px
              )`
            }}
          ></div>
        </div>

        {/* Horizontal line after spacing */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Hackathons & Team Projects Section */}
        <div className="relative" id="projects">
          <Section className="py-8">
            <ProjectsSection showTitle={true} />
          </Section>
          
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Spacing between projects sections with diagonal lines */}
        <div className="relative h-8 -mx-[50vw] left-1/2 right-1/2 w-screen">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(24, 24, 27, 0.3) 10px,
                rgba(24, 24, 27, 0.3) 11px
              )`
            }}
          ></div>
        </div>

        {/* Horizontal line after spacing */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Personal Projects Section */}
        <div className="relative">
          <Section className="py-8">
            <PersonalProjectsSection showTitle={true} />
          </Section>
          
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Spacing after Projects with diagonal lines */}
        <div className="relative h-8 -mx-[50vw] left-1/2 right-1/2 w-screen">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(24, 24, 27, 0.3) 10px,
                rgba(24, 24, 27, 0.3) 11px
              )`
            }}
          ></div>
        </div>

        {/* Horizontal line after spacing */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Certifications & Courses Section */}
        <div className="relative" id="experience">
          <Section className="py-8">
            <CertificationsSection showTitle={true} />
          </Section>
          
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Spacing between Certifications and Achievements */}
        <div className="relative h-8 -mx-[50vw] left-1/2 right-1/2 w-screen">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(24, 24, 27, 0.3) 10px,
                rgba(24, 24, 27, 0.3) 11px
              )`
            }}
          ></div>
        </div>

        {/* Horizontal line after spacing */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Achievements Section */}
        <div className="relative">
          <Section className="py-8">
            <AchievementsSection showTitle={true} />
          </Section>
          
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Spacing after Achievements with diagonal lines */}
        <div className="relative h-8 -mx-[50vw] left-1/2 right-1/2 w-screen">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(24, 24, 27, 0.3) 10px,
                rgba(24, 24, 27, 0.3) 11px
              )`
            }}
          ></div>
        </div>

        {/* Horizontal line after spacing */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Information Section */}
        <div className="relative">
          <Section className="py-4 px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {/* Left Column */}
              <div className="space-y-2.5">
                {/* Student Item */}
                <div className="flex items-center gap-4 group">
                  <div className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#2A2A2A] to-[#0A0A0A] shadow-lg"></div>
                    <div className="absolute inset-[2px] rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] shadow-inner"></div>
                    <GraduationCap className="w-4 h-4 text-white relative z-10" strokeWidth={2} />
                  </div>
                  <span className="text-white font-mono text-sm tracking-wide">Student</span>
                </div>

                {/* Location Item */}
                <div className="flex items-center gap-4 group">
                  <div className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#2A2A2A] to-[#0A0A0A] shadow-lg"></div>
                    <div className="absolute inset-[2px] rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] shadow-inner"></div>
                    <MapPin className="w-4 h-4 text-white relative z-10" strokeWidth={2} />
                  </div>
                  <span className="text-white font-mono text-sm tracking-wide">Mohali, Punjab, India</span>
                </div>

                {/* Phone Item */}
                <div className="flex items-center gap-4 group">
                  <div className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#2A2A2A] to-[#0A0A0A] shadow-lg"></div>
                    <div className="absolute inset-[2px] rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] shadow-inner"></div>
                    <Phone className="w-4 h-4 text-white relative z-10" strokeWidth={2} />
                  </div>
                  <span className="text-white font-mono text-sm tracking-wide">+91 8352986476</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-2.5">
                {/* Email Item */}
                <div className="flex items-center gap-4 group">
                  <div className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#2A2A2A] to-[#0A0A0A] shadow-lg"></div>
                    <div className="absolute inset-[2px] rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] shadow-inner"></div>
                    <Mail className="w-4 h-4 text-white relative z-10" strokeWidth={2} />
                  </div>
                  <span className="text-white font-mono text-sm tracking-wide">imnotdivyansh@gmail.com</span>
                </div>

                {/* Gender Item */}
                <div className="flex items-center gap-4 group">
                  <div className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#2A2A2A] to-[#0A0A0A] shadow-lg"></div>
                    <div className="absolute inset-[2px] rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] shadow-inner"></div>
                    <User className="w-4 h-4 text-white relative z-10" strokeWidth={2} />
                  </div>
                  <span className="text-white font-mono text-sm tracking-wide">he/him</span>
                </div>

                {/* Experience Item */}
                <div className="flex items-center gap-4 group">
                  <div className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#2A2A2A] to-[#0A0A0A] shadow-lg"></div>
                    <div className="absolute inset-[2px] rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] shadow-inner"></div>
                    <Code className="w-4 h-4 text-white relative z-10" strokeWidth={2} />
                  </div>
                  <span className="text-white font-mono text-sm tracking-wide">Fresher</span>
                </div>
              </div>
            </div>
          </Section>
          
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Links Section */}
        <div className="relative">
          <Section className="py-0">
            <ClipPathLinks />
          </Section>
          
          {/* Bottom horizontal line - full width */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-[#18181B]"></div>
        </div>

        {/* Spacing after Links with diagonal lines */}
        <div className="relative h-8 -mx-[50vw] left-1/2 right-1/2 w-screen">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(24, 24, 27, 0.3) 10px,
                rgba(24, 24, 27, 0.3) 11px
              )`
            }}
          ></div>
        </div>

        {/* Profile Card Section */}
        <div className="relative pt-4 pb-0">
          <Section className="py-2">
            <ProfileCard />
          </Section>
        </div>

        {/* Contact Form Section right above Footer */}
        <div className="relative border-t border-[#18181B] bg-[#09090B]">
          <ContactSection />
        </div>
      </main>
    </ConstrainedLayout>

    {/* Cinematic Footer */}
    <CinematicFooter />
    </>
  );
}
