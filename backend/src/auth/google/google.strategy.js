"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GoogleStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../auth.service");
let GoogleStrategy = GoogleStrategy_1 = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    authService;
    logger = new common_1.Logger(GoogleStrategy_1.name);
    constructor(configService, authService) {
        const clientID = configService.get('GOOGLE_CLIENT_ID');
        const clientSecret = configService.get('GOOGLE_CLIENT_SECRET');
        const callbackURL = configService.get('GOOGLE_CALLBACK_URL', 'http://localhost:3000/api/auth/google/callback');
        if (!clientID || !clientSecret) {
            throw new common_1.InternalServerErrorException('Google OAuth Client ID or Secret not configured in .env file');
        }
        super({
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: 'http://localhost:3000/api/google/callback',
            scope: ['email', 'profile'],
        });
        this.authService = authService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        const { name, emails } = profile;
        const googleUser = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            accessToken,
        };
        this.logger.log(`Google user profile received: ${googleUser.email}`);
        try {
            const user = await this.authService.findOrCreateGoogleUser(googleUser);
            if (!user) {
                throw new common_1.InternalServerErrorException('Could not find or create user after Google validation');
            }
            done(null, user);
        }
        catch (error) {
            this.logger.error(`Error during Google user validation: ${error.message}`, error.stack);
            done(error, false);
        }
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = GoogleStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], GoogleStrategy);
//# sourceMappingURL=google.strategy.js.map