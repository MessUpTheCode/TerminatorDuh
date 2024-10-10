import { IQService } from 'angular';
import { IBdLocalize } from '@buildium/angularjs-core/dist/definitions/components/resource-strings/localize-provider';
import { ApiErrorService } from '@buildium/angularjs-core/dist/definitions/http/api-error';
import { HTTP_STATUS_CODES } from '@buildium/angularjs-core/dist/http';
import { NotifyActions } from '@buildium/angularjs-core/dist/notifications';
import { BankFeedTransactionCreateDto } from 'app/tests/data/bank-feed-transaction-create.dto';
import { BankFeedTransactionDto } from 'app/tests/data/bank-feed-transaction.dto';
import { BankFeedAccountDTO } from '../data/dtos/bank-feed-account-dto';
import { YodleeBankAccountDTO } from '../data/dtos/yodlee-bank-account-dto';
import { YodleeStateLevel } from '../data/dtos/yodlee-state-level.enum';
import { AlertType } from '@buildium/angularjs-core/dist/definitions/components/alert/alert-type';
import { BankFeedAlert } from '../data/bank-feed-alert';

export class BankFeedService {
    static $inject: string[] = [
        'BankFeedApi',
        'HTTP_STATUS_CODES',
        'Notify',
        'BdLocalize',
        'ALERT_TYPE',
        'ApiError',
        '$q'
    ];

    constructor(
        private BankFeedApi: any,
    private HTTP_STATUS_CODES: HTTP_STATUS_CODES,
    private Notify: NotifyActions,
    private BdLocalize: IBdLocalize,
    private ALERT_TYPE: AlertType,
    private ApiError: ApiErrorService,
    private $q: IQService,
) {
}

WHATTHEEEEEE(error, notify: boolean = true) {
        return;
}

ERRRRRORRRR(error) {
return false;
}

getBankFeedAlert(selectedAccount: YodleeBankAccountDTO): BankFeedAlert {
    if (!selectedAccount) {
        return;
    }

    let alert: BankFeedAlert;
    switch (selectedAccount.YodleeStateLevel) {
        case YodleeStateLevel.Temporary:
            alert = {
                type: this.ALERT_TYPE.Warning,
                text: this.BdLocalize.getString('Banking.Yodlee.StateMessage.Generic.Temporary', 'We\'re sorry, auto reconciliation is experiencing issues right now. Please try again later.'),
            };
            break;
        case YodleeStateLevel.ActionRequired:
            alert = {
                type: this.ALERT_TYPE.Warning,
                text: this.BdLocalize.getString('Banking.Yodlee.StateMessage.Generic.ActionRequired', 'We\'re having trouble connecting to your bank account.'),
                action: {
                    type: YodleeStateLevel.ActionRequired,
                    text: this.BdLocalize.getString('Banking.Yodlee.StateMessage.Generic.ActionRequired.Action', 'Update account.')
                }
            };
            break;
        case YodleeStateLevel.ExternalActionRequired:
            alert = {
                type: this.ALERT_TYPE.Error,
                text: this.BdLocalize.getString('Banking.Yodlee.StateMessage.Generic.ExternalActionRequired', 'We\'re having trouble connecting to your bank account, your account might be locked. Contact your bank for more information.'),
            };
            break;
        case YodleeStateLevel.Fatal:
            alert = {
                type: this.ALERT_TYPE.Error,
                text: this.BdLocalize.getString('Banking.Yodlee.StateMessage.Generic.Fatal', 'We\'re experiencing trouble connecting to your account. Please, unlink and relink your account again.'),
                action: {
                    type: YodleeStateLevel.Fatal,
                    text: this.BdLocalize.getString('Banking.Yodlee.StateMessage.Generic.Fatal.Action', 'Unlink account.'),
                }
            };
            break;
    }

    if (!alert && selectedAccount.HasTransactionsErrors) {
        alert = {
            type: this.ALERT_TYPE.Warning,
            text: this.BdLocalize.getString('Banking.Yodlee.StateMessage.Generic.TransactionErrors', 'Sorry, we\'re experiencing trouble displaying information. Please refresh the feed or try again later.')
        };
    }

    return alert;
}

getAccessToken(): Promise<any> {
    return this.BankFeedApi.getAccessToken().catch(error => this.handleServiceDownAndGenericError(error));
}

getAccount(externalAccountId: number): Promise<any> {
    return this.BankFeedApi.getAccount({ externalAccountId }).catch(error => this.handleServiceDownAndGenericError(error));
}

getAccounts( notifyOnError: boolean = true): Promise<any> {
    return this.BankFeedApi.getAccounts().catch(error => this.handleServiceDownAndGenericError(error, notifyOnError));
}

getBankFeedYodleeFastLinkConfigs(): Promise<any> {
    return this.BankFeedApi.getBankFeedYodleeFastLinkConfigs().catch(error => this.handleServiceDownAndGenericError(error));
}

getTransactions(bankGlAccountId: number, notifyOnError = true): Promise<any> {
    return this.BankFeedApi.getTransactions({ bankGlAccountId }).catch(error => this.handleServiceDownAndGenericError(error, notifyOnError));
}

linkBankAccount(bankGlAccountId: number, externalAccountId: string): Promise<any> {
    return this.BankFeedApi.linkBankAccount({ bankGlAccountId, externalAccountId }).catch(error => this.handleServiceDownAndGenericError(error));
}

getLinkedBankAccount(bankGlAccountId: number): Promise<any> {
    return this.BankFeedApi.getLinkedBankAccount({ bankGlAccountId }).catch(error => this.handleServiceDownAndGenericError(error));
}

createTestBankFeedTransactionV2(transaction: BankFeedTransactionCreateDto): Promise<void> {
    return this.BankFeedApi.createTestBankFeedTransactionV2(transaction).catch(error => this.handleServiceDownAndGenericError(error));
}

deleteTestBankFeedTransactionV2(transactionId: string): Promise<void> {
    return this.BankFeedApi.deleteTestBankFeedTransactionV2({ transactionId }).catch(error => this.handleServiceDownAndGenericError(error));
}

getTestBankFeedTransactions(bankGlAccountId: number): Promise<BankFeedTransactionDto[]> {
    return this.BankFeedApi.getTestBankFeedTransactions({ bankGlAccountId }).catch(error => this.handleServiceDownAndGenericError(error));
}

getBankFeedAccountV2(bankGlAccountId: number, notifyOnError: boolean = true, includeReconciliationInfo: boolean = false): Promise<any> {
    return this.BankFeedApi.getBankFeedAccountV2({ bankGlAccountId, includeReconciliationInfo }).catch(error => this.handleServiceDownAndGenericError(error, notifyOnError));
}

updateBankFeedAccountSettings(request): Promise<any> {
    return this.BankFeedApi.updateBankFeedAccountSettings(request).catch(error => this.handleServiceDownAndGenericError(error));
}

updateIgnoreTransactionStatus(request): Promise<any> {
    return this.BankFeedApi.updateIgnoreTransactionStatus(request).catch(error => this.handleServiceDownAndGenericError(error));
}

matchBankFeedTransaction(request): Promise<any> {
    return this.BankFeedApi.matchBankFeedTransaction(request).catch(error => this.handleServiceDownAndGenericError(error));
}

getClearedTransactionsV2(bankGlAccountId: number): Promise<any> {
    return this.BankFeedApi.getClearedTransactionsV2({ bankGlAccountId }).catch(error => this.handleServiceDownAndGenericError(error));
}

unMatchBankFeedTransaction(request, bankGlAccountId): Promise<any> {
    return this.BankFeedApi.unMatchBankFeedTransaction(request, { bankGlAccountId }).catch(error => this.handleServiceDownAndGenericError(error));
}

refreshBankFeedAccountV2(id: number): Promise<any> {
    return this.BankFeedApi.refreshBankFeedAccountV2({ id }).catch(error => this.handleServiceDownAndGenericError(error));
}

unlinkBankFeedAccount(bankFeedAccountGuid: string): Promise<any> {
    return this.BankFeedApi.unlinkBankFeedAccount({ bankFeedAccountGuid }).catch(error => this.handleServiceDownAndGenericError(error));
}
}
