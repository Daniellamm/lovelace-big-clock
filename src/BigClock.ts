/* eslint-disable @typescript-eslint/no-explicit-any */
import {css, CSSResult, html, LitElement, PropertyValues, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators';
import {DateTime} from 'luxon';
import {HomeAssistant} from 'custom-card-helpers';

import {CARD_VERSION} from './const';

/* eslint no-console: 0 */
console.info(
    `%c  Big-Clock \n%c  Version ${CARD_VERSION}    `,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: dimgray',
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'big-clock',
    name: 'BigClock',
    description: 'A large digital clock component',
});

interface IBigClockConfig {
    timeZone?: string;
    locale?: string;
}

@customElement('big-clock')
export class BigClock extends LitElement {
    @property({attribute: false}) public hass!: HomeAssistant;
    @state() private _time = '';
    @state() private _date = '';
    @state() private _config?: IBigClockConfig;
    private _intervalId?: number;

    public setConfig(config: IBigClockConfig): void {
        this._config = {...config};
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        return changedProps.has('_time') || changedProps.has('_date') || changedProps.has('_config') || changedProps.has('hass');
    }

    public async getCardSize(): Promise<number> {
        return 3;
    }

    public connectedCallback(): void {
        super.connectedCallback();
        this._updateDateTime();
        this._intervalId = window.setInterval(this._updateDateTime.bind(this), 60000);
    }

    public disconnectedCallback(): void {
        if (this._intervalId) {
            window.clearInterval(this._intervalId);
            this._intervalId = undefined;
        }
        super.disconnectedCallback();
    }

    private _updateDateTime(): void {
        const timeZone = this._config?.timeZone ?? this.hass?.config?.time_zone;
        const locale = this._config?.locale ?? this.hass?.locale?.language ?? 'en-US';

        let dateTime: DateTime = DateTime.local();
        if (timeZone)
            dateTime = dateTime.setZone(timeZone);
        if (locale)
            dateTime = dateTime.setLocale(locale);

        const time = dateTime.toLocaleString({hour: 'numeric', minute: '2-digit'});
        const date = dateTime.toLocaleString({weekday: 'long', month: 'short', day: 'numeric'});

        if (time !== this._time) this._time = time;
        if (date !== this._date) this._date = date;
    }

    protected render(): TemplateResult | void {
        return html`
            <ha-card>
                <span class="time">${this._time}</span>
                <span class="date">${this._date}</span>
            </ha-card>
        `;
    }

    static get styles(): CSSResult {
        return css`
          ha-card {
            text-align: center;
            font-weight: bold;
            padding: 10px 0;
            background: none;
            box-shadow: none;
          }

          .time {
            display: block;
            font-size: 90px;
            line-height: 1.2;
          }

          .date {
            display: block;
            font-size: 40px;
            margin-top: -10px;
          }
        `;
    }
}
