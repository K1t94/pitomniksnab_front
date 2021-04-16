export enum InputValidations {
    EMAIL = 'email',
    LATIN = 'latin',
    PHONE = 'phone',
    AGE = 'age',
    FULL_NAME = 'full_name',
}


const URL_PATTERN = '^(?:(?:(?:https?|ftp):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\\.(?:[a-z\u00a1-\uffff]{2,})))(?::\\d{2,5})?(?:[/?#]\\S*)?$';
const LATIN_PATTERN = /^[a-zA-Z1-9]+$/gm;
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
const PHONE_PATTERN = /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/gm;
const AGE_PATTERN = /^(?:1[01][0-9]|119|[1-9]|1[0-9]|[2-9][0-9])$/gm;
const FULL_DATE_PATTERN = /(19|20)\d\d-((0[1-9]|1[012])-(0[1-9]|[12]\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31) ([0-1]\d|2[0-3])(:[0-5]\d){2}/gm; // YYYY-MM-DD HH:MM:SS
const FIGURES_PATTERN = /^[0-9]+$/gm;
const FIGURES_PATTERN_WITHOUT_LEADING_SERO = /^(?!0)[0-9]+$/gm;


class ValidateService {
    private _regExpFormat: (pattern: (string | RegExp)) => RegExp = (pattern: string | RegExp): RegExp => new RegExp(pattern, 'i');

    public isEmailValid = (value: string): boolean => this._regExpFormat(EMAIL_PATTERN).test(value);

    public isLatinValid = (value: string): boolean => this._regExpFormat(LATIN_PATTERN).test(value);

    public isPhoneValid = (value: string): boolean => this._regExpFormat(PHONE_PATTERN).test(value);

    public isAgeValid = (value: string): boolean => this._regExpFormat(AGE_PATTERN).test(value); // Ограничения: 0<Возраст<120 лет.

    public isText = (value: string): boolean => !!value.trim();

    public isUrlValid = (value: string): boolean => this._regExpFormat(URL_PATTERN).test(value);

    public isFullDateValid = (value: string): boolean => this._regExpFormat(FULL_DATE_PATTERN).test(value);

    public isWithoutLeadingZero = (value: string): boolean => this._regExpFormat(FIGURES_PATTERN_WITHOUT_LEADING_SERO).test(value); // число без нулей в начале

    public isFiguresValid = (value: string): boolean => this._regExpFormat(FIGURES_PATTERN).test(value);
}


export default ValidateService;
