import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {NavigationItemConfig, VerticalNavigationComponent} from 'patternfly-ng/navigation';
import {TranslateUtil} from '../ngx-translate/translate.util';
import {KeycloakService} from '../keycloak-service/keycloak.service';
import {Referrer} from "../page/referrer";

declare const baseUrl: string;
declare const resourceUrl: string;
declare const isInternationalizationEnabled: boolean;
declare const availableLocales: Array<Object>;

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'vertical-nav',
    styleUrls: ['./vertical-nav.component.css'],
    templateUrl: './vertical-nav.component.html'
})
export class VerticalNavComponent implements OnInit {
    @ViewChild('pfVerticalNav') pfVerticalNav: VerticalNavigationComponent;

    public resourceUrl: string = resourceUrl;
    public availableLocales: Array<Object> = availableLocales;

    private referrer: Referrer;

    navigationItems: NavigationItemConfig[];

    constructor(private keycloakService: KeycloakService,
                private translateUtil: TranslateUtil, ) {
        this.referrer = new Referrer(translateUtil);
    }

    ngOnInit(): void {
        this.navigationItems = [
            {
                title: this.translateUtil.translate('personalInfoHtmlTitle'),
                iconStyleClass: 'pficon pficon-user',
                url: 'account',
                mobileItem: false
            },
            {
                title: this.translateUtil.translate('accountSecurityTitle'),
                iconStyleClass: 'fa fa-shield',
                children: [
                    {
                        title: this.translateUtil.translate('changePasswordHtmlTitle'),
                        iconStyleClass: 'fa fa-shield',
                        url: 'password',
                    },
                    {
                        title: this.translateUtil.translate('authenticatorTitle'),
                        iconStyleClass: 'fa fa-shield',
                        url: 'authenticator',
                    },
                    {
                        title: this.translateUtil.translate('device-activity'),
                        iconStyleClass: 'fa fa-shield',
                        url: 'device-activity',
                    },
                    {
                        title: this.translateUtil.translate('linkedAccountsHtmlTitle'),
                        iconStyleClass: 'fa fa-shield',
                        url: 'linked-accounts',
                    },
                ],
            },
            {
                title: this.translateUtil.translate('applicationsHtmlTitle'),
                iconStyleClass: 'fa fa-th',
                url: 'applications',
            },
            {
                title: this.translateUtil.translate('myResources'),
                iconStyleClass: 'fa fa-file-o',
                url: 'my-resources',
            }
        ];
    }

    private logout() {
        this.keycloakService.logout(baseUrl);
    }

    private isShowLocales(): boolean {
        return isInternationalizationEnabled && (this.availableLocales.length > 1);
    }

    private changeLocale(newLocale: string) {
        this.keycloakService.login({kcLocale: newLocale});
    }

    onItemClicked($event: NavigationItemConfig): void {
        if (this.pfVerticalNav.hoverSecondaryNav) {
            this.pfVerticalNav.collapseSecondaryNav($event);
        }
    }
}