"use client";
import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import MainModalContent from "./MainModalContent";
import JazzCashModalContent from "./JazzCashModalContent";
import EasyPaisaModalContent from "./EasyPaisaModalContent";
import BankTransferModalContent from "./BankTransferModalContent";

interface WithdrawPaymentModalProps {
  openModal: boolean;
  onClose: () => void;
}
export default function WithdrawPaymentModal({
  openModal,
  onClose,
}: WithdrawPaymentModalProps) {
  const [mainModalOpen, setMainModalOpen] = useState(openModal);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [methodModalOpen, setMethodModalOpen] = useState(false);

  useEffect(() => {
    setMainModalOpen(openModal);
  }, [openModal]);

  const handleContinue = (method: string | null) => {
    setSelectedMethod(method);
    setMethodModalOpen(true);
    setMainModalOpen(false);
  };

  const handleBackToMain = () => {
    setMethodModalOpen(false);
    setMainModalOpen(true);
  };

  const handleCloseAll = () => {
    setMethodModalOpen(false);
    setMainModalOpen(false);
    setSelectedMethod(null);
    onClose();
  };

  return (
    <>
      <Modal
        opened={mainModalOpen}
        onClose={handleCloseAll}
        title="Withdraw Funds"
        size="50%"
        styles={{
          content: {
            borderRadius: "10px",
          },
          title: {
            fontWeight: 600,
          },
        }}
      >
        <MainModalContent
          onContinue={handleContinue}
          onCancel={handleCloseAll}
        />
      </Modal>
      <Modal
        opened={methodModalOpen}
        onClose={handleBackToMain}
        title={selectedMethod ? `Withdraw via ${selectedMethod}` : "Withdraw"}
        size="50%"
        styles={{
          content: {
            borderRadius: "10px",
          },
          title: {
            fontWeight: 600,
          },
        }}
      >
        {selectedMethod === "JazzCash" && (
          <JazzCashModalContent
            onClose={handleCloseAll}
            onBack={handleBackToMain}
          />
        )}
        {selectedMethod === "Easypaisa" && (
          <EasyPaisaModalContent
            onClose={handleCloseAll}
            onBack={handleBackToMain}
          />
        )}
        {selectedMethod === "Bank Transfer" && (
          <BankTransferModalContent
            onClose={handleCloseAll}
            onBack={handleBackToMain}
          />
        )}
      </Modal>
    </>
  );
}
