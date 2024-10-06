import type { CountryCode } from "./CountryCode.js";
import type { Currency } from "./Currency.js";
import type { _Date } from "./Date.js";
import type { DateTime } from "./DateTime.js";
import type { Duration } from "./Duration.js";
import type { EmailAddress } from "./EmailAddress.js";
import type { HexColorCode } from "./HexColorCode.js";
import type { IP } from "./IP.js";
import type { IPv4 } from "./IPv4.js";
import type { Ipv6 } from "./IPv6.js";
import type { JSONObject } from "./JSONObject.js";
import type { Latitude } from "./Latitude.js";
import type { Longitude } from "./Longitude.js";
import type { NegativeFloat } from "./NegativeFloat.js";
import type { NegativeInt } from "./NegativeInt.js";
import type { NonEmptyString } from "./NonEmptyString.js";
import type { NonNegativeFloat } from "./NonNegativeFloat.js";
import type { NonNegativeInt } from "./NonNegativeInt.js";
import type { NonPositiveFloat } from "./NonPositiveFloat.js";
import type { NonPositiveInt } from "./NonPositiveInt.js";
import type { PhoneNumber } from "./PhoneNumber.js";
import type { PositiveFloat } from "./PositiveFloat.js";
import type { PositiveInt } from "./PositiveInt.js";
import type { Time } from "./Time.js";
import type { TimeZone } from "./TimeZone.js";
import type { Timestamp } from "./Timestamp.js";
import type { _URL } from "./URL.js";
import type { UTCOffset } from "./UTCOffset.js";

/**
 * Map of scalar types used in talawa api from pothos schema's perspective for usage in pothos schema builder intiializer.
 */
export type Scalars = {
	CountryCode: CountryCode;
	Currency: Currency;
	Date: _Date;
	DateTime: DateTime;
	Duration: Duration;
	EmailAddress: EmailAddress;
	HexColorCode: HexColorCode;
	IP: IP;
	IPv4: IPv4;
	IPv6: Ipv6;
	JSONObject: JSONObject;
	Latitude: Latitude;
	Longitude: Longitude;
	NegativeFloat: NegativeFloat;
	NegativeInt: NegativeInt;
	NonEmptyString: NonEmptyString;
	NonNegativeFloat: NonNegativeFloat;
	NonNegativeInt: NonNegativeInt;
	NonPositiveFloat: NonPositiveFloat;
	NonPositiveInt: NonPositiveInt;
	PhoneNumber: PhoneNumber;
	PositiveFloat: PositiveFloat;
	PositiveInt: PositiveInt;
	Time: Time;
	TimeZone: TimeZone;
	Timestamp: Timestamp;
	URL: _URL;
	UTCOffset: UTCOffset;
};

/**
 * Map of scalar types used in talawa api from a client's perspective.
 */
export type ClientScalars = {
	CountryCode: string;
	Currency: string;
	Date: string;
	DateTime: string;
	Duration: string;
	EmailAddress: string;
	HexColorCode: string;
	IP: string;
	IPv4: string;
	IPv6: string;
	JSONObject: string;
	Latitude: number;
	Longitude: number;
	NegativeFloat: number;
	NegativeInt: number;
	NonEmptyString: string;
	NonNegativeFloat: number;
	NonNegativeInt: number;
	NonPostitiveFloat: number;
	NonPositiveInt: number;
	PhoneNumber: string;
	PositiveFloat: number;
	PositiveInt: number;
	Time: string;
	Timestamp: string;
	TimeZone: string;
	URL: string;
	UTCOffset: string;
};

export * from "./CountryCode.js";
export * from "./Currency.js";
export * from "./Date.js";
export * from "./DateTime.js";
export * from "./Duration.js";
export * from "./EmailAddress.js";
export * from "./HexColorCode.js";
export * from "./IP.js";
export * from "./IPv4.js";
export * from "./IPv6.js";
export * from "./JSONObject.js";
export * from "./Latitude.js";
export * from "./Longitude.js";
export * from "./NegativeFloat.js";
export * from "./NegativeInt.js";
export * from "./NonEmptyString.js";
export * from "./NonNegativeFloat.js";
export * from "./NonNegativeInt.js";
export * from "./NonPositiveFloat.js";
export * from "./NonPositiveInt.js";
export * from "./PhoneNumber.js";
export * from "./PositiveFloat.js";
export * from "./PositiveInt.js";
export * from "./Time.js";
export * from "./TimeZone.js";
export * from "./Timestamp.js";
export * from "./URL.js";
export * from "./UTCOffset.js";
