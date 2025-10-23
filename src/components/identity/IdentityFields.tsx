'use client';
import React from 'react';
import type { Identity } from '@/types/type';
import Input from '@/components/common/Input';

type Props = {
    value: Identity;
    onChange: (next: Identity) => void;
    onReadyChange?: (ready: boolean) => void;
};

export default function IdentityFields({ value, onChange, onReadyChange }: Props) {
    const { name, rrn6, rrn1 } = value;

    const handleChange = (patch: Partial<Identity>) => {
        const next = { ...value, ...patch };
        onChange(next);
        const nameOk = (next.name || '').trim().length > 1;
        const rrn6Ok = /^\d{6}$/.test(next.rrn6 || '');
        const rrn1Ok = /^\d{1}$/.test(next.rrn1 || '');
        onReadyChange?.(nameOk && rrn6Ok && rrn1Ok);
    };

    return (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="이름 (성 + 이름)"
                value={name}
                onChange={(e) => handleChange({ name: e.currentTarget.value })}
            />
            <div className="flex items-end gap-3">
                <Input
                    className="flex-1"
                    placeholder="123456"
                    inputMode="numeric"
                    maxLength={6}
                    value={rrn6}
                    onChange={(e) =>
                        handleChange({
                            rrn6: (e.currentTarget.value || '').replace(/[^0-9]/g, '').slice(0, 6),
                        })
                    }
                />
                <span className="pb-3" style={{ color: 'var(--color-text-muted)' }}>
                    -
                </span>
                <Input
                    className="flex-1"
                    placeholder="1"
                    inputMode="numeric"
                    maxLength={1}
                    value={rrn1}
                    onChange={(e) =>
                        handleChange({
                            rrn1: (e.currentTarget.value || '').replace(/[^0-9]/g, '').slice(0, 1),
                        })
                    }
                />
            </div>
        </div>
    );
}
