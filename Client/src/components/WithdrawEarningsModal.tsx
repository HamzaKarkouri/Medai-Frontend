import React, { useState } from 'react';
import { X, CreditCard, Building, AlertCircle } from 'lucide-react';

interface BankAccount {
  accountHolder: string;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
}

interface WithdrawEarningsModalProps {
  onClose: () => void;
  onWithdraw: (amount: number) => void;
  availableBalance: number;
  bankAccount?: BankAccount;
}

function WithdrawEarningsModal({ onClose, onWithdraw, availableBalance, bankAccount: initialBankAccount }: WithdrawEarningsModalProps) {
  const [amount, setAmount] = useState<string>('');
  const [isEditingBank, setIsEditingBank] = useState(!initialBankAccount);
  const [bankAccount, setBankAccount] = useState<BankAccount>(initialBankAccount || {
    accountHolder: '',
    accountNumber: '',
    bankName: '',
    routingNumber: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      onWithdraw(parseFloat(amount));
      setIsProcessing(false);
      onClose();
    }, 1500);
  };

  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankAccount(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Withdraw Earnings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
            <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900">Available Balance</h3>
              <p className="text-2xl font-bold text-blue-600">${availableBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isEditingBank && initialBankAccount ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-gray-600" />
                  <h3 className="font-medium">Bank Account Details</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingBank(true)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Edit
                </button>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Account Holder: {bankAccount.accountHolder}</p>
                <p>Bank: {bankAccount.bankName}</p>
                <p>Account Number: •••• {bankAccount.accountNumber.slice(-4)}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-medium">Bank Account Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  name="accountHolder"
                  value={bankAccount.accountHolder}
                  onChange={handleBankDetailsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={bankAccount.bankName}
                  onChange={handleBankDetailsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={bankAccount.accountNumber}
                  onChange={handleBankDetailsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Routing Number
                </label>
                <input
                  type="text"
                  name="routingNumber"
                  value={bankAccount.routingNumber}
                  onChange={handleBankDetailsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Withdrawal Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                max={availableBalance}
                step="0.01"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {parseFloat(amount) > availableBalance && (
            <div className="flex items-start space-x-2 text-red-600 text-sm">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>Amount exceeds available balance</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing || !amount || parseFloat(amount) > availableBalance || !bankAccount.accountNumber}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Withdraw Funds'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default WithdrawEarningsModal;