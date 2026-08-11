"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { FileText, Menu as MenuIcon, X, Sparkles, FolderGit2, Code2, Award, Mail, Trophy, GraduationCap } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function NavbarDemo({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const resumeUrl = "/api/resume";
  const githubUrl = "https://github.com/divyanshthakur5552";

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-4 sm:top-6 z-50 mx-auto max-w-6xl px-4 sm:px-6 transition-all duration-300",
        className
      )}
    >
      <Menu setActive={setActive} className="w-full justify-between backdrop-blur-xl bg-[#09090B]/85 border-zinc-800/80 shadow-2xl">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#home"
            className="flex items-center gap-2.5 group transition-transform hover:scale-105"
          >
            <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700/80 flex items-center justify-center overflow-hidden p-1 shadow-inner group-hover:border-zinc-500 transition-colors">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-semibold text-white tracking-tight hidden sm:inline-block text-sm font-sans">
              Divyansh<span className="text-zinc-400">.dev</span>
            </span>
          </a>
        </div>

        {/* Middle: Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <MenuItem setActive={setActive} active={active} item="Home" href="#home" />

          <MenuItem setActive={setActive} active={active} item="About" href="#about" />

          <MenuItem setActive={setActive} active={active} item="Experience">
            <div className="flex flex-col space-y-2.5 text-sm p-2 w-[240px]">
              <HoveredLink href="#projects" className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" /> Hackathons & Team Projects
              </HoveredLink>
              <HoveredLink href="#experience" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-400" /> Certifications & Courses
              </HoveredLink>
              <HoveredLink href="#experience" className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" /> Achievements
              </HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Projects">
            <div className="grid grid-cols-2 gap-4 p-2 text-sm w-[420px]">
              <ProductItem
                title="Replysens.ai"
                href="#projects"
                src="/logo.png"
                description="Business automation platform with React.js, Node.js & RESTful APIs."
              />
              <ProductItem
                title="Guardian AI"
                href="#projects"
                src="/logo.png"
                description="IoT safety system with real-time sensor monitoring."
              />
              <div className="col-span-2 pt-2 border-t border-zinc-800 flex justify-between items-center text-xs">
                <HoveredLink href="#projects" className="flex items-center gap-1.5 text-zinc-300 hover:text-white">
                  <FolderGit2 className="w-3.5 h-3.5" /> All Projects
                </HoveredLink>
                <HoveredLink href="#projects" className="text-zinc-500 hover:text-zinc-300">
                  Team & Personal
                </HoveredLink>
              </div>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Skills">
            <div className="flex flex-col space-y-2.5 text-sm p-2 w-[220px]">
              <HoveredLink href="#skills" className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-zinc-400" /> Frontend Tech
              </HoveredLink>
              <HoveredLink href="#skills" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-zinc-400" /> Backend & DB
              </HoveredLink>
              <HoveredLink href="#skills" className="flex items-center gap-2">
                <Award className="w-4 h-4 text-zinc-400" /> Developer Tools
              </HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Contact" href="#contact" />
        </div>

        {/* Right Side: GitHub & Resume Links */}
        <div className="hidden md:flex items-center space-x-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-zinc-500 transition-all shadow-sm"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-3.5 h-3.5 text-white" />
            <span>GitHub</span>
          </a>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-black bg-white hover:bg-zinc-200 transition-all shadow-md font-sans hover:scale-105 active:scale-95"
            aria-label="Resume Download"
          >
            <FileText className="w-3.5 h-3.5 text-black" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-black bg-white"
          >
            <FileText className="w-3 h-3 text-black" />
            <span>Resume</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-zinc-300 hover:text-white bg-zinc-800/80 rounded-full border border-zinc-700 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </Menu>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl bg-[#09090B]/95 backdrop-blur-xl border border-zinc-800 shadow-2xl flex flex-col space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
          >
            About
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
          >
            Experience
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
          >
            Projects
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
          >
            Skills
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
          >
            Contact
          </a>

          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between gap-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium text-zinc-200 bg-zinc-800/80 border border-zinc-700"
            >
              <FaGithub className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium text-black bg-white"
            >
              <FileText className="w-4 h-4 text-black" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
