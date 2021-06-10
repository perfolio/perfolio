import React from 'react';
import {
  Button,
  WithSidebar,
  Radio,
  AsyncButton,
  Input,
  Value,
  Spinner,
} from '@perfolio/components';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Time } from '@perfolio/time';
import { NextPage } from 'next';
import { Transaction } from '@perfolio/db';
import {
  useTransactions,
  useCreateTransaction,
  usePrice,
  useCompany,
  useSymbol,
} from '@perfolio/api';
import { withAuthentication } from '@perfolio/auth';
const Suggestion: React.FC<{
  tx: Transaction;
  setValue: (key: 'isin', val: string) => void;
  trigger: () => void;
}> = ({ tx, setValue, trigger }): JSX.Element => {
  const { data: symbol } = useSymbol({ isin: tx.data.assetId });
  const { data: company } = useCompany({ symbol: symbol?.data.symbol });

  return (
    <li className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-3">
        {company ? (
          <Image
            className="w-10 h-10 rounded"
            alt={`Logo of ${company?.data.name}`}
            src={company?.data.logo ?? ''}
            height={64}
            width={64}
          />
        ) : null}
        <div className="flex flex-col items-start truncate ">
          <span className="font-medium text-gray-800 ">
            {company?.data.name}
          </span>
          <span className="text-xs text-gray-600 md:text-sm">
            {tx.data.assetId}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-1">
        <span className="text-sm text-right text-gray-600">{`added ${Time.ago(
          tx.ts / 1_000_000
        )}`}</span>
        <div>
          <Button
            label="Add"
            kind="secondary"
            size="small"
            onClick={() => {
              setValue('isin', tx.data.assetId);
              trigger();
            }}
          />
        </div>
      </div>
    </li>
  );
};

interface FormData {
  buy: boolean;
  isin: string;
  price: number;
  shares: number;
  date: Date;
}

/**
 * / page.
 */
const NewTransactionPage: NextPage = () => {
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: 'all', defaultValues: { date: new Date() } });

  const { mutateAsync: createTransaction } = useCreateTransaction();
  const { data: transactions } = useTransactions();
  console.log({transactions})
  const uniqueAssets: Record<string, Transaction> = {};
  transactions
    ?.sort((a, b) => b.ts - a.ts)
    .forEach((tx) => {
      if (!(tx.data.assetId in uniqueAssets)) {
        uniqueAssets[tx.data.assetId] = tx;
      }
    });
  const data = watch();
  const { data: symbol } = useSymbol({ isin: data.isin });

  const { data: price, isLoading: priceLoading } = usePrice({
    symbol: symbol?.data.symbol,
    time: data.date ? Time.fromDate(new Date(data.date)).unix() : undefined,
  });

  const { data: company, isLoading: companyLoading } = useCompany({
    symbol: symbol?.data.symbol,
  });

  return (
    <WithSidebar title="Add a transaction" sidebar={null}>
      <div className="grid grid-cols-1 divide-y divide-gray-200 lg:gap-8 lg:divide-x lg:divide-y-0 lg:grid-cols-2">
        <div className="w-full">
          <form className="flex flex-col py-6 space-y-4">
            {/* <Radio
              updateValue={(buy) => setValue('buy', buy)}
              options={['Buy', 'Sell']}
            /> */}
            <Input
              type="text"
              label="Isin"
              placeholder="US0123456789"
              iconLeft={
                company ? (
                  <Image
                    src={company.data.logo}
                    alt={`Logo of ${company.data.name}`}
                    width={64}
                    height={64}
                  />
                ) : companyLoading ? (
                  <Spinner />
                ) : null
              }
              register={register('isin', {
                required: 'What did you buy or sell?',

                pattern: {
                  value: /[A-Z]{2}[a-zA-Z0-9]{10}/,
                  message: 'Please enter a valid isin',
                },
              })}
              error={errors.isin?.message}
            />

            <Input
              type="date"
              label="Date of transaction"
              register={register('date', {
                required: `When did you ${data.buy ? 'buy' : 'sell'}?`,
              })}
              error={errors.date?.message}
            />

            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                label="How many shares?"
                register={register('shares', {
                  required: `How many shares did you ${
                    data.buy ? 'buy' : 'sell'
                  }?`,
                })}
                error={errors.shares?.message}
              />
              <Value
                label="Price per share"
                value={
                  price && price.data.value > 0
                    ? price.data.value.toFixed(2)
                    : ''
                }
                tooltip="Automatically fetched when all data is entered correctly"
                iconLeft={
                  price ? (
                    <div className="flex items-center justify-center w-full h-full">
                      <span className="font-medium text-gray-700">$</span>
                    </div>
                  ) : priceLoading ? (
                    <Spinner />
                  ) : null
                }
              />
            </div>
            <AsyncButton
              size="auto"
              kind="primary"
              label="Add Transaction"
              onClick={handleSubmit(async (data: FormData) => {
                if (!price) {
                  throw new Error('Wait for price to load');
                }
                await createTransaction({
                  assetId: data.isin.trim(),
                  volume: data.shares * (data.buy ? 1 : -1),
                  value: price.data.value,
                  executedAt: Time.fromDate(new Date(data.date)).unix(),
                });
              })}
            />
          </form>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between px-6 py-6">
            <p className="text-sm font-semibold leading-tight text-gray-800 lg:text-xl">
              Suggestions
            </p>
          </div>
          <div className="px-6 pt-6 overflow-x-auto">
            <div className="w-full whitespace-nowrap">
              <ul className="flex flex-col divide-y divide-gray-100">
                {Object.values(uniqueAssets).map((tx) => {
                  return (
                    <Suggestion
                      key={tx.id}
                      tx={tx}
                      trigger={() => trigger('isin')}
                      setValue={setValue}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </WithSidebar>
  );
};

export default withAuthentication(NewTransactionPage);
