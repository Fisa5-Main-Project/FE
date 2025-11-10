"use client";

import React from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "lucide-react";
import Button from "@/components/common/Button"; // (경로 확인)
import { useFamilyCustom } from "@/hooks/inheritance/useFamilyCustom";

export default function FamilyCustomPage() {
  const {
    isModalOpen,
    setIsModalOpen,
    openModal,
    addHeir,
    selectedHeirs,
    heirOptions,
    handleNext,
    isButtonDisabled,
  } = useFamilyCustom();

  // <추가> 버튼 - 그리드 아이템용
  const AddButton = ({ onClick }: { onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="flex aspect-square h-full w-full items-center justify-center rounded-[0.75rem] bg-white shadow-lg cursor-pointer"
    >
      {" "}
      <div className="flex h-10 w-10 items-center justify-center rounded-full  border-primary border-2 text-primary">
        <Plus className="h-6 w-6" />
      </div>
    </button>
  );

  return (
    <>
      <form className="flex flex-col flex-grow h-full">
        <div className="flex-grow">
          <h1 className="mt-[6.75rem] text-secondary text-[2rem] font-bold">
            가족 유형
          </h1>
          <p className="mt-2 text-subheading text-[1.375rem] font-medium">
            본인의 가족 유형을 선택해주세요.
          </p>

          <div className="mt-6">
            {selectedHeirs.length === 0 ? (
              // 큰 <추가> 버튼
              <button
                type="button"
                onClick={openModal}
                className="mx-auto flex h-[18.75rem] w-[18.75rem] items-center justify-center rounded-[1rem] bg-white shadow-lg cursor-pointer"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary text-primary">
                  <Plus className="h-10 w-10" />
                </div>
              </button>
            ) : (
              // 상속인 추가된 경우
              <div className="grid grid-cols-2 gap-[1.124rem]">
                {selectedHeirs.map((heir, index) => (
                  <div
                    key={`${heir.id}-${index}`}
                    className="flex aspect-square w-full flex-col items-center justify-center rounded-[0.75rem] bg-white text-secondary shadow-lg"
                  >
                    <Image
                      src={`/assets/inheritance/${heir.imgBase}.svg`}
                      alt={heir.label}
                      width={64}
                      height={64}
                    />
                    <span className="mt-2 text-[1rem] font-medium">
                      {heir.label}
                    </span>
                  </div>
                ))}
                <AddButton onClick={openModal} />
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink-0">
          <Button
            type="button"
            onClick={handleNext}
            disabled={isButtonDisabled}
          >
            다음
          </Button>
        </div>
      </form>

      {/* === 토스트 팝업 === */}
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
          <Dialog.Content
            className="fixed bottom-0 left-0 right-0 z-50 
                       w-full max-w-[var(--page-max-width)] mx-auto 
                       rounded-t-2xl bg-white p-6 shadow-lg 
                       data-[state=open]:animate-in data-[state=closed]:animate-out 
                       data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full"
          >
            {/* 팝업 헤더 */}
            <div className="mb-4 flex items-center justify-between">
              <Dialog.Title className="text-[1.25rem] font-bold text-secondary">
                추가하실 상속인을 선택하세요
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-neutral-500 cursor-pointer">
                  <X className="h-6 w-6" />
                </button>
              </Dialog.Close>
            </div>

            {/* 팝업 리스트 */}
            <ul>
              {heirOptions.map((heir) => (
                <li key={heir.id}>
                  <button
                    onClick={() => addHeir(heir)}
                    className="w-full py-4 px-9 text-left text-[1.125rem] text-neutral-800 cursor-pointer"
                  >
                    {heir.label}
                  </button>
                </li>
              ))}
            </ul>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
