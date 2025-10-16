import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 여러 클래스 이름과 조건부 클래스를 안전하게 결합하고 Tailwind CSS 클래스를 병합합니다.
 * @param {...ClassValue} inputs - 클래스 이름, 클래스 이름 배열, 또는 조건부 클래스 객체.
 * @returns {string} 병합되고 정리된 클래스 이름 문자열.
 *
 * @example
 * // cn('p-4', 'font-bold', isPrimary && 'bg-blue-500');
 * // => 'p-4 font-bold bg-blue-500'
 *
 * @example
 * // cn('p-2', 'p-4');
 * // => 'p-4' (tailwind-merge가 중복을 처리)
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
