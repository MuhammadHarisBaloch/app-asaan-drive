// WithdrawPaymentModal.tsx
"use client";

import { Modal } from "@mantine/core";
import { useState, useEffect } from "react";
import MainModalContent from "./MainModalContent";
import JazzCashModalContent from "./JazzCashModalContent";
import EasyPaisaModalContent from "./EasyPaisaModalContent";
import BankTransferModalContent from "./BankTransferModalContent";

interface WithdrawPaymentModalProps {
  openModal: boolean;
  onClose: () => void;
  availableBalance: number;
  onWithdrawComplete: (amount: number) => void; // parent ko notify
}

export default function WithdrawPaymentModal({
  openModal,
  onClose,
  availableBalance,
  onWithdrawComplete,
}: WithdrawPaymentModalProps) {
  const [mainModalOpen, setMainModalOpen] = useState(openModal);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [methodModalOpen, setMethodModalOpen] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(availableBalance);

  useEffect(() => {
    setMainModalOpen(openModal);
    setCurrentBalance(availableBalance);
  }, [openModal, availableBalance]);

  const handleContinue = (method: string, amount: number) => {
    setSelectedMethod(method);
    setMethodModalOpen(true);
    setMainModalOpen(false);
    setCurrentBalance(amount);
  };

  const handleBackToMain = () => {
    setMethodModalOpen(false);
    setMainModalOpen(true);
  };

  const handleWithdrawDone = (amount: number) => {
    if (amount > 0) {
      const newBalance = currentBalance - amount;
      onWithdrawComplete(amount);
      setCurrentBalance(newBalance);
    }
    setMethodModalOpen(false);
    setMainModalOpen(false);
    setSelectedMethod(null);
    onClose();
  };

  return (
    <>
      <Modal opened={mainModalOpen} onClose={onClose} title="Withdraw Funds">
        <MainModalContent
          onContinue={handleContinue}
          onCancel={onClose}
          availableBalance={currentBalance}
        />
      </Modal>

      <Modal
        opened={methodModalOpen}
        onClose={handleBackToMain}
        title={selectedMethod ? `Withdraw via ${selectedMethod}` : "Withdraw"}
      >
        {selectedMethod === "JazzCash" && (
          <JazzCashModalContent
            onClose={() => handleWithdrawDone(0)}
            onBack={handleBackToMain}
            availableBalance={currentBalance}
            onWithdrawSuccess={(amount: number) => handleWithdrawDone(amount)}
          />
        )}
        {selectedMethod === "Easypaisa" && (
          <EasyPaisaModalContent
            onClose={() => handleWithdrawDone(0)}
            onBack={handleBackToMain}
            availableBalance={currentBalance}
            onWithdrawSuccess={(amount: number) => handleWithdrawDone(amount)}
          />
        )}
        {selectedMethod === "Bank Transfer" && (
          <BankTransferModalContent
            onClose={() => handleWithdrawDone(0)}
            onBack={handleBackToMain}
            availableBalance={currentBalance}
            onWithdrawSuccess={(amount: number) => handleWithdrawDone(amount)}
          />
        )}
      </Modal>
    </>
  );
}
