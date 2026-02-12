'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BadgeInfo,
    Bell,
    ChevronDown,
    Globe,
    Grid2x2,
    Heart,
    House,
    IdCard,
    LocateFixed,
    Menu,
    ShoppingBag,
    UserRound,
    X,
    type LucideIcon,
} from 'lucide-react';

type HeaderDropdown = 'category' | 'language' | 'profile' | null;

const categoryItems = [
    { label: 'Dresses', href: '#' },
    { label: 'T-Shirts', href: '#' },
    { label: 'Hoodies', href: '#' },
    { label: 'All Products', href: '/dashboard' },
];

const profileItems = [
    { label: 'My Account', href: '#' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Logout', href: '/' },
];

const rightIcons: Array<{ icon: LucideIcon; href: string; label: string }> = [
    { icon: ShoppingBag, href: '#', label: 'Cart' },
    { icon: Bell, href: '#', label: 'Notifications' },
    { icon: Heart, href: '#', label: 'Favorites' },
];

export const Header = () => {
    const pathname = usePathname();
    const hiddenPaths = ['/', '/register', '/verify'];
    const headerRef = useRef<HTMLElement | null>(null);
    const [openDropdown, setOpenDropdown] = useState<HeaderDropdown>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [language, setLanguage] = useState<'EN' | 'AR'>('EN');
    const isProductDetails = pathname === '/product-details';

    const headerBackground = useMemo(() => {
        if (isProductDetails && !mobileMenuOpen) {
            return 'bg-white/50 backdrop-blur-[1px]';
        }
        return 'bg-white/95 backdrop-blur';
    }, [isProductDetails, mobileMenuOpen]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!headerRef.current?.contains(event.target as Node)) {
                setOpenDropdown(null);
                setMobileMenuOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpenDropdown(null);
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const toggleDropdown = (menu: Exclude<HeaderDropdown, null>) => {
        setOpenDropdown((prev) => (prev === menu ? null : menu));
    };

    const closeMenus = () => {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
    };

    if (hiddenPaths.includes(pathname)) {
        return null;
    }

    return (
        <header ref={headerRef} className={`sticky top-0 z-50 w-full border-b border-[#e8e8e8] ${headerBackground}`}>
            <div className="mx-auto flex h-[64px] w-full max-w-[1440px] items-center justify-start px-4 sm:h-[74px] sm:px-6 lg:px-10">
                <Link href="/dashboard" className="flex-shrink-0">
                    <Image
                        src="/svg/TT LogoTT Logo 1.svg"
                        alt="Tinytales Logo"
                        width={66}
                        height={51}
                        className="h-[28px] w-[38px] sm:h-[44px] sm:w-[58px] lg:h-[51px] lg:w-[66px]"
                        priority
                    />
                </Link>

                <nav className="hidden items-center gap-8 xl:ml-24 xl:flex">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-1 text-[14px] font-normal text-[#8b8b8b] transition-colors hover:text-[#6f6f6f]"
                    >
                        <House size={18} strokeWidth={1.85} />
                        <span>Home</span>
                    </Link>

                    <div className="relative">
                        <button
                            type="button"
                            className="flex items-center gap-1 text-[14px] font-normal text-[#8b8b8b] transition-colors hover:text-[#6f6f6f]"
                            onClick={() => toggleDropdown('category')}
                            aria-expanded={openDropdown === 'category'}
                            aria-controls="header-category-menu"
                        >
                            <Grid2x2 size={18} strokeWidth={1.85} />
                            <span>Our Category</span>
                            <ChevronDown size={13} strokeWidth={2} />
                        </button>
                        {openDropdown === 'category' ? (
                            <div
                                id="header-category-menu"
                                className="absolute left-0 top-[calc(100%+10px)] min-w-[180px] rounded-xl border border-[#e8e8e8] bg-white p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                            >
                                {categoryItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="block rounded-lg px-3 py-2 text-[13px] text-[#222] transition-colors hover:bg-[#f5f5f5]"
                                        onClick={closeMenus}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    <Link
                        href="#"
                        className="flex items-center gap-1 text-[14px] font-normal text-[#8b8b8b] transition-colors hover:text-[#6f6f6f]"
                    >
                        <LocateFixed size={18} strokeWidth={1.85} />
                        <span>About Us</span>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-1 text-[14px] font-normal text-[#8b8b8b] transition-colors hover:text-[#6f6f6f]"
                    >
                        <IdCard size={18} strokeWidth={1.85} />
                        <span>Contact Us</span>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-1 text-[14px] font-normal text-[#8b8b8b] transition-colors hover:text-[#6f6f6f]"
                    >
                        <BadgeInfo size={18} strokeWidth={1.85} />
                        <span>FAQs</span>
                    </Link>
                </nav>

                <div className="ml-auto flex items-center gap-4 sm:gap-5">
                    {rightIcons.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="hidden text-[#020202] transition-colors hover:text-primary md:flex"
                            aria-label={item.label}
                        >
                            <item.icon size={22} strokeWidth={1.9} />
                        </Link>
                    ))}

                    <div className="relative hidden md:block">
                        <button
                            type="button"
                            className="flex items-center gap-1 text-[13px] font-normal text-[#020202] transition-colors hover:text-primary"
                            onClick={() => toggleDropdown('language')}
                            aria-expanded={openDropdown === 'language'}
                            aria-controls="header-language-menu"
                        >
                            <Globe size={18} strokeWidth={1.9} />
                            <span>{language}</span>
                            <ChevronDown size={13} strokeWidth={2} />
                        </button>
                        {openDropdown === 'language' ? (
                            <div
                                id="header-language-menu"
                                className="absolute right-0 top-[calc(100%+10px)] min-w-[92px] rounded-xl border border-[#e8e8e8] bg-white p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                            >
                                <button
                                    type="button"
                                    className="block w-full rounded-lg px-3 py-2 text-left text-[13px] text-[#222] transition-colors hover:bg-[#f5f5f5]"
                                    onClick={() => {
                                        setLanguage('EN');
                                        setOpenDropdown(null);
                                    }}
                                >
                                    EN
                                </button>
                                <button
                                    type="button"
                                    className="block w-full rounded-lg px-3 py-2 text-left text-[13px] text-[#222] transition-colors hover:bg-[#f5f5f5]"
                                    onClick={() => {
                                        setLanguage('AR');
                                        setOpenDropdown(null);
                                    }}
                                >
                                    AR
                                </button>
                            </div>
                        ) : null}
                    </div>

                    <div className="relative hidden md:block">
                        <button
                            type="button"
                            className="flex items-center gap-1 text-[#020202] transition-colors hover:text-primary"
                            aria-label="User menu"
                            onClick={() => toggleDropdown('profile')}
                            aria-expanded={openDropdown === 'profile'}
                            aria-controls="header-profile-menu"
                        >
                            <UserRound size={22} strokeWidth={1.9} />
                            <ChevronDown size={13} strokeWidth={2} />
                        </button>
                        {openDropdown === 'profile' ? (
                            <div
                                id="header-profile-menu"
                                className="absolute right-0 top-[calc(100%+10px)] min-w-[140px] rounded-xl border border-[#e8e8e8] bg-white p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                            >
                                {profileItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="block rounded-lg px-3 py-2 text-[13px] text-[#222] transition-colors hover:bg-[#f5f5f5]"
                                        onClick={closeMenus}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    <button
                        type="button"
                        className="rounded-md p-1.5 text-[#020202] md:hidden"
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                    >
                        {mobileMenuOpen ? <X size={22} strokeWidth={1.9} /> : <Menu size={22} strokeWidth={1.9} />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen ? (
                <div className="border-t border-[#ececec] bg-white/95 px-4 pb-5 pt-3 md:hidden">
                    <nav className="space-y-1">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 rounded-lg px-2 py-2 text-[14px] text-[#020202] hover:bg-[#f5f5f5]"
                            onClick={closeMenus}
                        >
                            <House size={18} strokeWidth={1.9} />
                            Home
                        </Link>

                        <details className="group rounded-lg px-2 py-1 hover:bg-[#f5f5f5]">
                            <summary className="flex cursor-pointer list-none items-center justify-between py-1 text-[14px] text-[#020202]">
                                <span className="flex items-center gap-2">
                                    <Grid2x2 size={18} strokeWidth={1.9} />
                                    Our Category
                                </span>
                                <ChevronDown size={14} strokeWidth={2} className="transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="ml-7 mt-1 flex flex-col">
                                {categoryItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="rounded-md px-2 py-1.5 text-[13px] text-[#3a3a3a] hover:bg-[#efefef]"
                                        onClick={closeMenus}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </details>

                        <Link href="#" className="flex items-center gap-2 rounded-lg px-2 py-2 text-[14px] text-[#020202] hover:bg-[#f5f5f5]">
                            <LocateFixed size={18} strokeWidth={1.85} />
                            About Us
                        </Link>
                        <Link href="#" className="flex items-center gap-2 rounded-lg px-2 py-2 text-[14px] text-[#020202] hover:bg-[#f5f5f5]">
                            <IdCard size={18} strokeWidth={1.85} />
                            Contact Us
                        </Link>
                        <Link href="#" className="flex items-center gap-2 rounded-lg px-2 py-2 text-[14px] text-[#020202] hover:bg-[#f5f5f5]">
                            <BadgeInfo size={18} strokeWidth={1.85} />
                            FAQs
                        </Link>
                    </nav>

                    <div className="mt-4 border-t border-[#ececec] pt-3">
                        <div className="mb-3 flex items-center gap-2">
                            {rightIcons.map((item) => (
                                <Link
                                    key={`mobile-${item.label}`}
                                    href={item.href}
                                    className="rounded-md p-2 text-[#020202] hover:bg-[#f5f5f5]"
                                    aria-label={item.label}
                                    onClick={closeMenus}
                                >
                                    <item.icon size={20} strokeWidth={1.9} />
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <Globe size={16} strokeWidth={1.9} />
                            <span className="text-[13px] text-[#666]">Language</span>
                            <button
                                type="button"
                                className={`rounded-md px-2 py-1 text-[12px] ${language === 'EN' ? 'bg-[#f1f1f1] text-[#111]' : 'text-[#666]'}`}
                                onClick={() => setLanguage('EN')}
                            >
                                EN
                            </button>
                            <button
                                type="button"
                                className={`rounded-md px-2 py-1 text-[12px] ${language === 'AR' ? 'bg-[#f1f1f1] text-[#111]' : 'text-[#666]'}`}
                                onClick={() => setLanguage('AR')}
                            >
                                AR
                            </button>
                        </div>

                        <div className="mt-3 flex flex-col gap-1">
                            {profileItems.map((item) => (
                                <Link
                                    key={`mobile-${item.label}`}
                                    href={item.href}
                                    className="rounded-lg px-2 py-2 text-[14px] text-[#020202] hover:bg-[#f5f5f5]"
                                    onClick={closeMenus}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}
        </header>
    );
};
