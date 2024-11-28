/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
    'AuthenticationPayload': { kind: 'OBJECT'; name: 'AuthenticationPayload'; fields: { 'authenticationToken': { name: 'authenticationToken'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'user': { name: 'user'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; }; };
    'Boolean': unknown;
    'Date': unknown;
    'DateTime': unknown;
    'EmailAddress': unknown;
    'ID': unknown;
    'Int': unknown;
    'Iso3166Alpha2CountryCode': { name: 'Iso3166Alpha2CountryCode'; enumValues: 'ad' | 'ae' | 'af' | 'ag' | 'ai' | 'al' | 'am' | 'ao' | 'aq' | 'ar' | 'as' | 'at' | 'au' | 'aw' | 'ax' | 'az' | 'ba' | 'bb' | 'bd' | 'be' | 'bf' | 'bg' | 'bh' | 'bi' | 'bj' | 'bl' | 'bm' | 'bn' | 'bo' | 'bq' | 'br' | 'bs' | 'bt' | 'bv' | 'bw' | 'by' | 'bz' | 'ca' | 'cc' | 'cd' | 'cf' | 'cg' | 'ch' | 'ci' | 'ck' | 'cl' | 'cm' | 'cn' | 'co' | 'cr' | 'cu' | 'cv' | 'cw' | 'cx' | 'cy' | 'cz' | 'de' | 'dj' | 'dk' | 'dm' | 'do' | 'dz' | 'ec' | 'ee' | 'eg' | 'eh' | 'er' | 'es' | 'et' | 'fi' | 'fj' | 'fk' | 'fm' | 'fo' | 'fr' | 'ga' | 'gb' | 'gd' | 'ge' | 'gf' | 'gg' | 'gh' | 'gi' | 'gl' | 'gm' | 'gn' | 'gp' | 'gq' | 'gr' | 'gs' | 'gt' | 'gu' | 'gw' | 'gy' | 'hk' | 'hm' | 'hn' | 'hr' | 'ht' | 'hu' | 'id' | 'ie' | 'il' | 'im' | 'in' | 'io' | 'iq' | 'ir' | 'is' | 'it' | 'je' | 'jm' | 'jo' | 'jp' | 'ke' | 'kg' | 'kh' | 'ki' | 'km' | 'kn' | 'kp' | 'kr' | 'kw' | 'ky' | 'kz' | 'la' | 'lb' | 'lc' | 'li' | 'lk' | 'lr' | 'ls' | 'lt' | 'lu' | 'lv' | 'ly' | 'ma' | 'mc' | 'md' | 'me' | 'mf' | 'mg' | 'mh' | 'mk' | 'ml' | 'mm' | 'mn' | 'mo' | 'mp' | 'mq' | 'mr' | 'ms' | 'mt' | 'mu' | 'mv' | 'mw' | 'mx' | 'my' | 'mz' | 'na' | 'nc' | 'ne' | 'nf' | 'ng' | 'ni' | 'nl' | 'no' | 'np' | 'nr' | 'nu' | 'nz' | 'om' | 'pa' | 'pe' | 'pf' | 'pg' | 'ph' | 'pk' | 'pl' | 'pm' | 'pn' | 'pr' | 'ps' | 'pt' | 'pw' | 'py' | 'qa' | 're' | 'ro' | 'rs' | 'ru' | 'rw' | 'sa' | 'sb' | 'sc' | 'sd' | 'se' | 'sg' | 'sh' | 'si' | 'sj' | 'sk' | 'sl' | 'sm' | 'sn' | 'so' | 'sr' | 'ss' | 'st' | 'sv' | 'sx' | 'sy' | 'sz' | 'tc' | 'td' | 'tf' | 'tg' | 'th' | 'tj' | 'tk' | 'tl' | 'tm' | 'tn' | 'to' | 'tr' | 'tt' | 'tv' | 'tw' | 'tz' | 'ua' | 'ug' | 'um' | 'us' | 'uy' | 'uz' | 'va' | 'vc' | 've' | 'vg' | 'vi' | 'vn' | 'vu' | 'wf' | 'ws' | 'ye' | 'yt' | 'za' | 'zm' | 'zw'; };
    'Mutation': { kind: 'OBJECT'; name: 'Mutation'; fields: { 'createOrganization': { name: 'createOrganization'; type: { kind: 'OBJECT'; name: 'Organization'; ofType: null; } }; 'createUser': { name: 'createUser'; type: { kind: 'OBJECT'; name: 'AuthenticationPayload'; ofType: null; } }; 'deleteCurrentUser': { name: 'deleteCurrentUser'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'deleteOrganization': { name: 'deleteOrganization'; type: { kind: 'OBJECT'; name: 'Organization'; ofType: null; } }; 'deleteUser': { name: 'deleteUser'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'signUp': { name: 'signUp'; type: { kind: 'OBJECT'; name: 'AuthenticationPayload'; ofType: null; } }; 'updateCurrentUser': { name: 'updateCurrentUser'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'updateOrganization': { name: 'updateOrganization'; type: { kind: 'OBJECT'; name: 'Organization'; ofType: null; } }; 'updateUser': { name: 'updateUser'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; }; };
    'MutationCreateOrganizationInput': { kind: 'INPUT_OBJECT'; name: 'MutationCreateOrganizationInput'; isOneOf: false; inputFields: [{ name: 'address'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'avatarURI'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'city'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'countryCode'; type: { kind: 'ENUM'; name: 'Iso3166Alpha2CountryCode'; ofType: null; }; defaultValue: null }, { name: 'description'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'postalCode'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'state'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'MutationCreateUserInput': { kind: 'INPUT_OBJECT'; name: 'MutationCreateUserInput'; isOneOf: false; inputFields: [{ name: 'address'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'avatarURI'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'birthDate'; type: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; defaultValue: null }, { name: 'city'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'countryCode'; type: { kind: 'ENUM'; name: 'Iso3166Alpha2CountryCode'; ofType: null; }; defaultValue: null }, { name: 'description'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'educationGrade'; type: { kind: 'ENUM'; name: 'UserEducationGrade'; ofType: null; }; defaultValue: null }, { name: 'emailAddress'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'EmailAddress'; ofType: null; }; }; defaultValue: null }, { name: 'employmentStatus'; type: { kind: 'ENUM'; name: 'UserEmploymentStatus'; ofType: null; }; defaultValue: null }, { name: 'homePhoneNumber'; type: { kind: 'SCALAR'; name: 'PhoneNumber'; ofType: null; }; defaultValue: null }, { name: 'isEmailAddressVerified'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; }; defaultValue: null }, { name: 'maritalStatus'; type: { kind: 'ENUM'; name: 'UserMaritalStatus'; ofType: null; }; defaultValue: null }, { name: 'mobilePhoneNumber'; type: { kind: 'SCALAR'; name: 'PhoneNumber'; ofType: null; }; defaultValue: null }, { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'natalSex'; type: { kind: 'ENUM'; name: 'UserNatalSex'; ofType: null; }; defaultValue: null }, { name: 'password'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'postalCode'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'role'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'ENUM'; name: 'UserRole'; ofType: null; }; }; defaultValue: null }, { name: 'state'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'workPhoneNumber'; type: { kind: 'SCALAR'; name: 'PhoneNumber'; ofType: null; }; defaultValue: null }]; };
    'MutationDeleteOrganizationInput': { kind: 'INPUT_OBJECT'; name: 'MutationDeleteOrganizationInput'; isOneOf: false; inputFields: [{ name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; }; defaultValue: null }]; };
    'MutationDeleteUserInput': { kind: 'INPUT_OBJECT'; name: 'MutationDeleteUserInput'; isOneOf: false; inputFields: [{ name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; }; defaultValue: null }]; };
    'MutationSignUpInput': { kind: 'INPUT_OBJECT'; name: 'MutationSignUpInput'; isOneOf: false; inputFields: [{ name: 'address'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'avatarURI'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'birthDate'; type: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; defaultValue: null }, { name: 'city'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'confirmedPassword'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'countryCode'; type: { kind: 'ENUM'; name: 'Iso3166Alpha2CountryCode'; ofType: null; }; defaultValue: null }, { name: 'description'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'educationGrade'; type: { kind: 'ENUM'; name: 'UserEducationGrade'; ofType: null; }; defaultValue: null }, { name: 'emailAddress'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'EmailAddress'; ofType: null; }; }; defaultValue: null }, { name: 'employmentStatus'; type: { kind: 'ENUM'; name: 'UserEmploymentStatus'; ofType: null; }; defaultValue: null }, { name: 'homePhoneNumber'; type: { kind: 'SCALAR'; name: 'PhoneNumber'; ofType: null; }; defaultValue: null }, { name: 'maritalStatus'; type: { kind: 'ENUM'; name: 'UserMaritalStatus'; ofType: null; }; defaultValue: null }, { name: 'mobilePhoneNumber'; type: { kind: 'SCALAR'; name: 'PhoneNumber'; ofType: null; }; defaultValue: null }, { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'natalSex'; type: { kind: 'ENUM'; name: 'UserNatalSex'; ofType: null; }; defaultValue: null }, { name: 'password'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'postalCode'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'state'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'workPhoneNumber'; type: { kind: 'SCALAR'; name: 'PhoneNumber'; ofType: null; }; defaultValue: null }]; };
    'MutationUpdateCurrentUserInput': { kind: 'INPUT_OBJECT'; name: 'MutationUpdateCurrentUserInput'; isOneOf: false; inputFields: [{ name: 'address'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'avatarURI'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'birthDate'; type: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; defaultValue: null }, { name: 'city'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'countryCode'; type: { kind: 'ENUM'; name: 'Iso3166Alpha2CountryCode'; ofType: null; }; defaultValue: null }, { name: 'description'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'educationGrade'; type: { kind: 'ENUM'; name: 'UserEducationGrade'; ofType: null; }; defaultValue: null }, { name: 'emailAddress'; type: { kind: 'SCALAR'; name: 'EmailAddress'; ofType: null; }; defaultValue: null }, { name: 'employmentStatus'; type: { kind: 'ENUM'; name: 'UserEmploymentStatus'; ofType: null; }; defaultValue: null }, { name: 'homePhoneNumber'; type: { kind: 'SCALAR'; name: 'PhoneNumber'; ofType: null; }; defaultValue: null }, { name: 'maritalStatus'; type: { kind: 'ENUM'; name: 'UserMaritalStatus'; ofType: null; }; defaultValue: null }, { name: 'mobilePhoneNumber'; type: { kind: 'SCALAR'; name: 'PhoneNumber'; ofType: null; }; defaultValue: null }, { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'natalSex'; type: { kind: 'ENUM'; name: 'UserNatalSex'; ofType: null; }; defaultValue: null }, { name: 'password'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'postalCode'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'state'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'workPhoneNumber'; type: { kind: 'SCALAR'; name: 'PhoneNumber'; ofType: null; }; defaultValue: null }]; };
    'MutationUpdateOrganizationInput': { kind: 'INPUT_OBJECT'; name: 'MutationUpdateOrganizationInput'; isOneOf: false; inputFields: [{ name: 'address'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'avatarURI'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'city'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'countryCode'; type: { kind: 'ENUM'; name: 'Iso3166Alpha2CountryCode'; ofType: null; }; defaultValue: null }, { name: 'description'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; }; defaultValue: null }, { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'postalCode'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'state'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'MutationUpdateUserInput': { kind: 'INPUT_OBJECT'; name: 'MutationUpdateUserInput'; isOneOf: false; inputFields: [{ name: 'address'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'avatarURI'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'birthDate'; type: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; defaultValue: null }, { name: 'city'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'countryCode'; type: { kind: 'ENUM'; name: 'Iso3166Alpha2CountryCode'; ofType: null; }; defaultValue: null }, { name: 'description'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'educationGrade'; type: { kind: 'ENUM'; name: 'UserEducationGrade'; ofType: null; }; defaultValue: null }, { name: 'emailAddress'; type: { kind: 'SCALAR'; name: 'EmailAddress'; ofType: null; }; defaultValue: null }, { name: 'employmentStatus'; type: { kind: 'ENUM'; name: 'UserEmploymentStatus'; ofType: null; }; defaultValue: null }, { name: 'homePhoneNumber'; type: { kind: 'SCALAR'; name: 'PhoneNumber'; ofType: null; }; defaultValue: null }, { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; }; defaultValue: null }, { name: 'isEmailAddressVerified'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'maritalStatus'; type: { kind: 'ENUM'; name: 'UserMaritalStatus'; ofType: null; }; defaultValue: null }, { name: 'mobilePhoneNumber'; type: { kind: 'SCALAR'; name: 'PhoneNumber'; ofType: null; }; defaultValue: null }, { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'natalSex'; type: { kind: 'ENUM'; name: 'UserNatalSex'; ofType: null; }; defaultValue: null }, { name: 'password'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'postalCode'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'role'; type: { kind: 'ENUM'; name: 'UserRole'; ofType: null; }; defaultValue: null }, { name: 'state'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'workPhoneNumber'; type: { kind: 'SCALAR'; name: 'PhoneNumber'; ofType: null; }; defaultValue: null }]; };
    'Organization': { kind: 'OBJECT'; name: 'Organization'; fields: { 'address': { name: 'address'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'avatarURI': { name: 'avatarURI'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'city': { name: 'city'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'countryCode': { name: 'countryCode'; type: { kind: 'ENUM'; name: 'Iso3166Alpha2CountryCode'; ofType: null; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; } }; 'creator': { name: 'creator'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'description': { name: 'description'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'members': { name: 'members'; type: { kind: 'OBJECT'; name: 'OrganizationMembersConnection'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'postalCode': { name: 'postalCode'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'state': { name: 'state'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; } }; 'updater': { name: 'updater'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; }; };
    'OrganizationMembersConnection': { kind: 'OBJECT'; name: 'OrganizationMembersConnection'; fields: { 'edges': { name: 'edges'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'OrganizationMembersConnectionEdge'; ofType: null; }; } }; 'pageInfo': { name: 'pageInfo'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'PageInfo'; ofType: null; }; } }; }; };
    'OrganizationMembersConnectionEdge': { kind: 'OBJECT'; name: 'OrganizationMembersConnectionEdge'; fields: { 'cursor': { name: 'cursor'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'node': { name: 'node'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; }; };
    'PageInfo': { kind: 'OBJECT'; name: 'PageInfo'; fields: { 'endCursor': { name: 'endCursor'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'hasNextPage': { name: 'hasNextPage'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'hasPreviousPage': { name: 'hasPreviousPage'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'startCursor': { name: 'startCursor'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'PhoneNumber': unknown;
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'currentUser': { name: 'currentUser'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'organization': { name: 'organization'; type: { kind: 'OBJECT'; name: 'Organization'; ofType: null; } }; 'renewAuthenticationToken': { name: 'renewAuthenticationToken'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'signIn': { name: 'signIn'; type: { kind: 'OBJECT'; name: 'AuthenticationPayload'; ofType: null; } }; 'user': { name: 'user'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; }; };
    'QueryOrganizationInput': { kind: 'INPUT_OBJECT'; name: 'QueryOrganizationInput'; isOneOf: false; inputFields: [{ name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }]; };
    'QuerySignInInput': { kind: 'INPUT_OBJECT'; name: 'QuerySignInInput'; isOneOf: false; inputFields: [{ name: 'emailAddress'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'EmailAddress'; ofType: null; }; }; defaultValue: null }, { name: 'password'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }]; };
    'QueryUserInput': { kind: 'INPUT_OBJECT'; name: 'QueryUserInput'; isOneOf: false; inputFields: [{ name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }]; };
    'String': unknown;
    'User': { kind: 'OBJECT'; name: 'User'; fields: { 'address': { name: 'address'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'avatarURI': { name: 'avatarURI'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'birthDate': { name: 'birthDate'; type: { kind: 'SCALAR'; name: 'Date'; ofType: null; } }; 'city': { name: 'city'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'countryCode': { name: 'countryCode'; type: { kind: 'ENUM'; name: 'Iso3166Alpha2CountryCode'; ofType: null; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; } }; 'creator': { name: 'creator'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'description': { name: 'description'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'educationGrade': { name: 'educationGrade'; type: { kind: 'ENUM'; name: 'UserEducationGrade'; ofType: null; } }; 'emailAddress': { name: 'emailAddress'; type: { kind: 'SCALAR'; name: 'EmailAddress'; ofType: null; } }; 'employmentStatus': { name: 'employmentStatus'; type: { kind: 'ENUM'; name: 'UserEmploymentStatus'; ofType: null; } }; 'homePhoneNumber': { name: 'homePhoneNumber'; type: { kind: 'SCALAR'; name: 'PhoneNumber'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'isEmailAddressVerified': { name: 'isEmailAddressVerified'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; } }; 'maritalStatus': { name: 'maritalStatus'; type: { kind: 'ENUM'; name: 'UserMaritalStatus'; ofType: null; } }; 'mobilePhoneNumber': { name: 'mobilePhoneNumber'; type: { kind: 'SCALAR'; name: 'PhoneNumber'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'natalSex': { name: 'natalSex'; type: { kind: 'ENUM'; name: 'UserNatalSex'; ofType: null; } }; 'organizationsMemberOf': { name: 'organizationsMemberOf'; type: { kind: 'OBJECT'; name: 'UserOrganizationsMemberOfConnection'; ofType: null; } }; 'postalCode': { name: 'postalCode'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'role': { name: 'role'; type: { kind: 'ENUM'; name: 'UserRole'; ofType: null; } }; 'state': { name: 'state'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; } }; 'updater': { name: 'updater'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'workPhoneNumber': { name: 'workPhoneNumber'; type: { kind: 'SCALAR'; name: 'PhoneNumber'; ofType: null; } }; }; };
    'UserEducationGrade': { name: 'UserEducationGrade'; enumValues: 'grade_1' | 'grade_2' | 'grade_3' | 'grade_4' | 'grade_5' | 'grade_6' | 'grade_7' | 'grade_8' | 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12' | 'graduate' | 'kg' | 'no_grade' | 'pre_kg'; };
    'UserEmploymentStatus': { name: 'UserEmploymentStatus'; enumValues: 'full_time' | 'part_time' | 'unemployed'; };
    'UserMaritalStatus': { name: 'UserMaritalStatus'; enumValues: 'divorced' | 'engaged' | 'married' | 'seperated' | 'single' | 'widowed'; };
    'UserNatalSex': { name: 'UserNatalSex'; enumValues: 'female' | 'intersex' | 'male'; };
    'UserOrganizationsMemberOfConnection': { kind: 'OBJECT'; name: 'UserOrganizationsMemberOfConnection'; fields: { 'edges': { name: 'edges'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'UserOrganizationsMemberOfConnectionEdge'; ofType: null; }; } }; 'pageInfo': { name: 'pageInfo'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'PageInfo'; ofType: null; }; } }; }; };
    'UserOrganizationsMemberOfConnectionEdge': { kind: 'OBJECT'; name: 'UserOrganizationsMemberOfConnectionEdge'; fields: { 'cursor': { name: 'cursor'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'node': { name: 'node'; type: { kind: 'OBJECT'; name: 'Organization'; ofType: null; } }; }; };
    'UserRole': { name: 'UserRole'; enumValues: 'administrator' | 'regular'; };
};

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'Query';
  mutation: 'Mutation';
  subscription: never;
  types: introspection_types;
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}