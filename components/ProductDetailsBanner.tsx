'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight01Icon } from 'hugeicons-react';

interface ProductDetailsBannerProps {
    title?: string;
    breadcrumbs?: { label: string; href?: string }[];
}

export const ProductDetailsBanner = ({
    title = 'Product Details',
    breadcrumbs = [
        { label: 'Home', href: '/dashboard' },
        { label: 'Our Category', href: '#' },
        { label: 'Product Details' },
    ],
}: ProductDetailsBannerProps) => {
    return (
        <section
            className="w-full relative overflow-hidden bg-transparent"
            style={{
                maxWidth: '1440px',
                margin: '0 auto',
            }}
        >
            {/* Product Details content area — 193px tall (284 total frame - 91px header) */}
            <div
                className="relative flex flex-col items-center justify-center pt-[32px] pb-[16px]"
                style={{
                    height: '193px',
                }}
            >
                {/* Watermark text — Poppins Bold 80px, outlined */}
                <span
                    className="absolute select-none pointer-events-none"
                    style={{
                        fontFamily: 'var(--font-poppins)',
                        fontSize: '80px',
                        fontWeight: 700,
                        lineHeight: '100%',
                        color: 'transparent',
                        WebkitTextStroke: '1px #ECECEC',
                        top: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {title}
                </span>

                {/* Product Details heading — Poppins SemiBold 32px */}
                <h1
                    className="relative z-10"
                    style={{
                        fontFamily: 'var(--font-poppins)',
                        fontSize: '32px',
                        fontWeight: 600,
                        lineHeight: '100%',
                        color: '#020202',
                        marginTop: '44px',
                    }}
                >
                    {title}
                </h1>
            </div>

            {/* Breadcrumb Area */}
            <div
                className="relative z-10 flex items-center justify-center pb-8"
                style={{
                    gap: '12px',
                }}
            >
                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.label}>
                        {index > 0 && (
                            <ArrowRight01Icon
                                size={14}
                                color="#020202"
                            />
                        )}
                        {crumb.label === 'Home' ? (
                            <Link
                                href={crumb.href || '/'}
                                className="transition-all hover:opacity-80"
                                style={{
                                    fontFamily: 'var(--font-poppins)',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    backgroundColor: '#FFE38E',
                                    color: '#020202',
                                    padding: '4px 12px',
                                    borderRadius: '8px',
                                    lineHeight: '100%',
                                }}
                            >
                                {crumb.label}
                            </Link>
                        ) : crumb.href ? (
                            <Link
                                href={crumb.href}
                                className="hover:text-primary transition-colors"
                                style={{
                                    fontFamily: 'var(--font-poppins)',
                                    fontSize: '12px',
                                    fontWeight: 400,
                                    color: '#020202',
                                    lineHeight: '100%',
                                }}
                            >
                                {crumb.label}
                            </Link>
                        ) : (
                            <span
                                style={{
                                    fontFamily: 'var(--font-poppins)',
                                    fontSize: '12px',
                                    fontWeight: 400,
                                    color: '#8A8A8A',
                                    lineHeight: '100%',
                                }}
                            >
                                {crumb.label}
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
};
