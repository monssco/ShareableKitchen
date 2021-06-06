import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AccountLinkInput = {
  refreshUrl: Scalars['String'];
  returnUrl: Scalars['String'];
};

export type AvailabilityInput = {
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  type: Scalars['String'];
};

export type AvailabilityObject = {
  __typename?: 'AvailabilityObject';
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  type: Scalars['String'];
};

/** Types of kitchen availability */
export enum AvailabilityType {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly'
}

export type Booking = {
  __typename?: 'Booking';
  listing: Listing;
  buyer: User;
  type: AvailabilityType;
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  unitPrice: Scalars['Int'];
  calculatedAmount: Scalars['Int'];
  buyerAppFee: Scalars['Int'];
  sellerAppFee: Scalars['Int'];
  created: Scalars['DateTime'];
  paymentDate?: Maybe<Scalars['DateTime']>;
};

export type CityInput = {
  state: StateInput;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type CityType = {
  __typename?: 'CityType';
  state: StateType;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Conversation = {
  __typename?: 'Conversation';
  buyer: User;
  seller: User;
  listing: Listing;
  id: Scalars['String'];
  messages: Array<Message>;
};

export type CountryInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
  currency: Scalars['String'];
  currencySymbol: Scalars['String'];
  states?: Maybe<Array<StateInput>>;
};

export type CountryType = {
  __typename?: 'CountryType';
  id: Scalars['Int'];
  name: Scalars['String'];
  currency: Scalars['String'];
  currencySymbol: Scalars['String'];
  states?: Maybe<Array<StateType>>;
};

export type CreateBookingInput = {
  listingId: Scalars['String'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  type: AvailabilityType;
};

export type CreateBookingReturn = {
  __typename?: 'CreateBookingReturn';
  bookingId: Scalars['String'];
  paymentIntentSecret: Scalars['String'];
};

export type CreateListingInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  unitPrice: Scalars['Int'];
  sqFtArea: Scalars['Int'];
  features: Array<PropertyFeatures>;
  propertyType: PropertyType;
  location: CreateListingLocationInput;
  availability: AvailabilityInput;
};

export type CreateListingLocationInput = {
  address: Scalars['String'];
  cityId: Scalars['Int'];
};


export type EditListingInput = {
  id: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  availability?: Maybe<AvailabilityInput>;
  address?: Maybe<Scalars['String']>;
  location?: Maybe<EditListingLocationInput>;
  postal?: Maybe<Scalars['String']>;
  unitPrice?: Maybe<Scalars['Int']>;
  sqFtArea?: Maybe<Scalars['Int']>;
  features?: Maybe<Array<PropertyFeatures>>;
  propertyType?: Maybe<PropertyType>;
};

export type EditListingLocationInput = {
  address?: Maybe<Scalars['String']>;
  cityId?: Maybe<Scalars['Float']>;
};

export type Image = {
  original_key: Scalars['String'];
  resized_medium: Scalars['String'];
  resized_small: Scalars['String'];
  resized_large: Scalars['String'];
};


export type ListMessagesInput = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  conversationId: Scalars['String'];
};

export type Listing = {
  __typename?: 'Listing';
  id: Scalars['ID'];
  author: User;
  title: Scalars['String'];
  description: Scalars['String'];
  availability: AvailabilityObject;
  photos?: Maybe<Array<ListingImage>>;
  address: Scalars['String'];
  city?: Maybe<CityType>;
  postal?: Maybe<Scalars['String']>;
  unitPrice: Scalars['Int'];
  sqFtArea: Scalars['Int'];
  features?: Maybe<Array<PropertyFeatures>>;
  propertyType?: Maybe<PropertyType>;
  bookings?: Maybe<Array<Booking>>;
  draft: Scalars['Boolean'];
};

export type ListingImage = Image & {
  __typename?: 'ListingImage';
  original_key: Scalars['String'];
  resized_medium: Scalars['String'];
  resized_small: Scalars['String'];
  resized_large: Scalars['String'];
};

export type Location = {
  address: Scalars['String'];
  city: CityType;
  postal?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['String'];
  conversation: Conversation;
  author: User;
  content: Scalars['String'];
  created: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking: CreateBookingReturn;
  /** Before creating a listing, check to see if this account has payouts enabled by calling arePayoutsEnabled query. */
  createListing: Listing;
  deleteMyListing: Scalars['Boolean'];
  editListing: Listing;
  sendMessage: Message;
  startConversation: Conversation;
  updateStripeAccount: Scalars['JSON'];
  attachPaymentMethod: Scalars['JSON'];
  detachPaymentMethod: Scalars['JSON'];
  createExternalAccount: Scalars['JSON'];
  deleteExternalAccount: Scalars['JSON'];
  cancelPayout: Scalars['JSON'];
  registerUser: User;
  updateUser: User;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreateListingArgs = {
  input: CreateListingInput;
};


export type MutationDeleteMyListingArgs = {
  id: Scalars['String'];
};


export type MutationEditListingArgs = {
  input: EditListingInput;
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationStartConversationArgs = {
  input: StartConversationInput;
};


export type MutationUpdateStripeAccountArgs = {
  input: Scalars['String'];
};


export type MutationAttachPaymentMethodArgs = {
  input: Scalars['String'];
};


export type MutationDetachPaymentMethodArgs = {
  input: Scalars['String'];
};


export type MutationCreateExternalAccountArgs = {
  input: Scalars['String'];
};


export type MutationDeleteExternalAccountArgs = {
  input: Scalars['String'];
};


export type MutationCancelPayoutArgs = {
  input: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  user: RegisterUserInput;
};


export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
};

export type PaginationInput = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

/** Features of a given kitchen */
export enum PropertyFeatures {
  Microwave = 'microwave',
  ConveyorOven = 'conveyorOven',
  TripleSink = 'tripleSink',
  DoughSheeter = 'doughSheeter',
  StandUpCooler = 'standUpCooler',
  WalkInCooler = 'walkInCooler',
  StonePizzaOven = 'stonePizzaOven',
  KitchenOven = 'kitchenOven',
  DoubleSink = 'doubleSink',
  Freezer = 'freezer',
  PrepTables = 'prepTables',
  DeepFryer = 'deepFryer',
  DoughMixer = 'doughMixer',
  Other = 'other'
}

/** Self-explanatory */
export enum PropertyType {
  Cafe = 'cafe',
  Church = 'church',
  CommercialKitchen = 'commercialKitchen',
  CommunityCenter = 'communityCenter',
  Restaurant = 'restaurant'
}

export type Query = {
  __typename?: 'Query';
  listBookings: Array<Booking>;
  listReservations: Array<Booking>;
  getCountries: Array<CountryType>;
  /** This endpoint is used to check if an account has payouts enabled. If payouts are not enabled, they must enable them by following the by using the getAccountLink endpoint. */
  arePayoutsEnabled: Scalars['Boolean'];
  homeGalleryListings: Array<Listing>;
  myListings: Array<Listing>;
  retrieveListing: Listing;
  searchListings: Array<Listing>;
  listConversations: Array<Conversation>;
  listMessages: Array<Message>;
  getStripeAccount: Scalars['JSON'];
  getStripeAccountBalance: Scalars['JSON'];
  /** Account links allow you to onboard a user via stripe. https://stripe.com/docs/api/account_links */
  getAccountLink: Scalars['JSON'];
  getStripeCustomer: Scalars['JSON'];
  listPaymentMethods: Scalars['JSON'];
  getExternalAccount: Scalars['JSON'];
  listExternalAccounts: Scalars['JSON'];
  retrievePaymentMethod: Scalars['JSON'];
  getPayout: Scalars['JSON'];
  listPayouts: Scalars['JSON'];
  me?: Maybe<User>;
};


export type QueryListBookingsArgs = {
  input: PaginationInput;
};


export type QueryListReservationsArgs = {
  input: PaginationInput;
};


export type QueryMyListingsArgs = {
  input: PaginationInput;
};


export type QueryRetrieveListingArgs = {
  id: Scalars['String'];
};


export type QuerySearchListingsArgs = {
  input: SearchListingsInput;
};


export type QueryListConversationsArgs = {
  input: PaginationInput;
};


export type QueryListMessagesArgs = {
  input: ListMessagesInput;
};


export type QueryGetAccountLinkArgs = {
  input: AccountLinkInput;
};


export type QueryListPaymentMethodsArgs = {
  input: Scalars['String'];
};


export type QueryGetExternalAccountArgs = {
  input: Scalars['String'];
};


export type QueryRetrievePaymentMethodArgs = {
  input: Scalars['String'];
};


export type QueryGetPayoutArgs = {
  input: Scalars['String'];
};

export type RegisterUserInput = {
  id: Scalars['ID'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  date_of_birth?: Maybe<Scalars['DateTime']>;
};

export type SearchListingsInput = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  cityId: Scalars['Int'];
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
};

export type SendMessageInput = {
  content: Scalars['String'];
  conversationId: Scalars['String'];
};

export type StartConversationInput = {
  listingId: Scalars['String'];
};

export type StateInput = {
  country: CountryInput;
  id: Scalars['Int'];
  name: Scalars['String'];
  cities?: Maybe<Array<CityInput>>;
};

export type StateType = {
  __typename?: 'StateType';
  country: CountryType;
  id: Scalars['Int'];
  name: Scalars['String'];
  cities?: Maybe<Array<CityType>>;
};

export type UpdateUserInput = {
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  date_of_birth?: Maybe<Scalars['DateTime']>;
  location?: Maybe<UpdateUserLocationInput>;
};

export type UpdateUserLocationInput = {
  address?: Maybe<Scalars['String']>;
  cityId?: Maybe<Scalars['Float']>;
  postal?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  profile_image?: Maybe<UserImage>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  date_of_birth?: Maybe<Scalars['DateTime']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<CityType>;
  postal?: Maybe<Scalars['String']>;
  stripe_customer_id: Scalars['String'];
  stripe_account_id?: Maybe<Scalars['String']>;
  listings?: Maybe<Array<Listing>>;
  bookings?: Maybe<Array<Booking>>;
  conversations?: Maybe<Array<Conversation>>;
  message?: Maybe<Array<Message>>;
};

export type UserImage = Image & {
  __typename?: 'UserImage';
  original_key: Scalars['String'];
  resized_medium: Scalars['String'];
  resized_small: Scalars['String'];
  resized_large: Scalars['String'];
};

export type GetHomeGalleryListingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomeGalleryListingsQuery = (
  { __typename?: 'Query' }
  & { homeGalleryListings: Array<(
    { __typename?: 'Listing' }
    & Pick<Listing, 'id' | 'title' | 'description' | 'unitPrice' | 'sqFtArea' | 'features' | 'propertyType'>
    & { photos?: Maybe<Array<(
      { __typename?: 'ListingImage' }
      & Pick<ListingImage, 'resized_medium'>
    )>>, city?: Maybe<(
      { __typename?: 'CityType' }
      & Pick<CityType, 'id'>
    )>, availability: (
      { __typename?: 'AvailabilityObject' }
      & Pick<AvailabilityObject, 'type'>
    ) }
  )> }
);

export type GetConversationsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type GetConversationsQuery = (
  { __typename?: 'Query' }
  & { listConversations: Array<(
    { __typename?: 'Conversation' }
    & Pick<Conversation, 'id'>
    & { messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'content' | 'created'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'first_name'>
        & { profile_image?: Maybe<(
          { __typename?: 'UserImage' }
          & Pick<UserImage, 'resized_small'>
        )> }
      ) }
    )>, listing: (
      { __typename?: 'Listing' }
      & Pick<Listing, 'id' | 'title'>
      & { photos?: Maybe<Array<(
        { __typename?: 'ListingImage' }
        & Pick<ListingImage, 'resized_small'>
      )>> }
    ) }
  )> }
);

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'date_of_birth' | 'address' | 'postal' | 'stripe_account_id' | 'stripe_customer_id'>
    & { profile_image?: Maybe<(
      { __typename: 'UserImage' }
      & Pick<UserImage, 'original_key' | 'resized_medium' | 'resized_small' | 'resized_large'>
    )>, city?: Maybe<(
      { __typename?: 'CityType' }
      & Pick<CityType, 'id' | 'name'>
    )> }
  )> }
);

export type MyListingsQueryQueryVariables = Exact<{
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type MyListingsQueryQuery = (
  { __typename?: 'Query' }
  & { myListings: Array<(
    { __typename?: 'Listing' }
    & Pick<Listing, 'id' | 'title' | 'description' | 'address' | 'postal' | 'unitPrice' | 'sqFtArea' | 'features' | 'propertyType'>
    & { availability: (
      { __typename?: 'AvailabilityObject' }
      & Pick<AvailabilityObject, 'startDate' | 'endDate' | 'type'>
    ), city?: Maybe<(
      { __typename?: 'CityType' }
      & Pick<CityType, 'id' | 'name'>
    )>, photos?: Maybe<Array<(
      { __typename?: 'ListingImage' }
      & Pick<ListingImage, 'original_key' | 'resized_medium' | 'resized_small' | 'resized_large'>
    )>>, bookings?: Maybe<Array<(
      { __typename?: 'Booking' }
      & Pick<Booking, 'startDate' | 'endDate'>
      & { buyer: (
        { __typename?: 'User' }
        & Pick<User, 'email' | 'id' | 'first_name' | 'last_name'>
        & { profile_image?: Maybe<(
          { __typename?: 'UserImage' }
          & Pick<UserImage, 'original_key' | 'resized_medium'>
        )> }
      ) }
    )>> }
  )> }
);

export type RetrieveListingQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type RetrieveListingQuery = (
  { __typename?: 'Query' }
  & { retrieveListing: (
    { __typename?: 'Listing' }
    & Pick<Listing, 'id' | 'title' | 'description' | 'address' | 'postal' | 'unitPrice' | 'sqFtArea' | 'features' | 'propertyType'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first_name'>
      & { profile_image?: Maybe<(
        { __typename?: 'UserImage' }
        & Pick<UserImage, 'resized_medium'>
      )> }
    ), availability: (
      { __typename?: 'AvailabilityObject' }
      & Pick<AvailabilityObject, 'startDate' | 'endDate' | 'type'>
    ), photos?: Maybe<Array<(
      { __typename?: 'ListingImage' }
      & Pick<ListingImage, 'resized_medium'>
    )>>, city?: Maybe<(
      { __typename?: 'CityType' }
      & Pick<CityType, 'id'>
    )>, bookings?: Maybe<Array<(
      { __typename?: 'Booking' }
      & Pick<Booking, 'startDate' | 'endDate'>
    )>> }
  ) }
);

export type SearchListingsQueryVariables = Exact<{
  cityId: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type SearchListingsQuery = (
  { __typename?: 'Query' }
  & { searchListings: Array<(
    { __typename?: 'Listing' }
    & Pick<Listing, 'id' | 'title' | 'description' | 'address' | 'postal' | 'features' | 'sqFtArea' | 'propertyType'>
    & { availability: (
      { __typename?: 'AvailabilityObject' }
      & Pick<AvailabilityObject, 'startDate' | 'endDate'>
    ), bookings?: Maybe<Array<(
      { __typename?: 'Booking' }
      & Pick<Booking, 'startDate' | 'endDate'>
    )>>, author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first_name' | 'last_name'>
    ), photos?: Maybe<Array<(
      { __typename?: 'ListingImage' }
      & Pick<ListingImage, 'resized_small'>
    )>> }
  )> }
);


export const GetHomeGalleryListingsDocument = gql`
    query getHomeGalleryListings {
  homeGalleryListings {
    id
    title
    description
    photos {
      resized_medium
    }
    city {
      id
    }
    unitPrice
    availability {
      type
    }
    sqFtArea
    features
    propertyType
  }
}
    `;
export const GetConversationsDocument = gql`
    query getConversations($limit: Int!, $offset: Int!) {
  listConversations(input: {limit: $limit, offset: $offset}) {
    id
    messages {
      id
      content
      created
      author {
        id
        first_name
        profile_image {
          resized_small
        }
      }
    }
    listing {
      id
      photos {
        resized_small
      }
      title
    }
  }
}
    `;
export const MeQueryDocument = gql`
    query MeQuery {
  me {
    id
    email
    first_name
    last_name
    date_of_birth
    profile_image {
      original_key
      resized_medium
      resized_small
      resized_large
      __typename
    }
    address
    city {
      id
      name
    }
    postal
    stripe_account_id
    stripe_customer_id
  }
}
    `;
export const MyListingsQueryDocument = gql`
    query myListingsQuery($offset: Int!, $limit: Int!) {
  myListings(input: {offset: $offset, limit: $limit}) {
    id
    title
    description
    availability {
      startDate
      endDate
      type
    }
    city {
      id
      name
    }
    photos {
      original_key
      resized_medium
      resized_small
      resized_large
    }
    address
    postal
    unitPrice
    sqFtArea
    features
    propertyType
    bookings {
      startDate
      endDate
      buyer {
        email
        id
        profile_image {
          original_key
          resized_medium
        }
        first_name
        last_name
      }
    }
  }
}
    `;
export const RetrieveListingDocument = gql`
    query retrieveListing($id: String!) {
  retrieveListing(id: $id) {
    id
    author {
      id
      profile_image {
        resized_medium
      }
      first_name
    }
    title
    description
    availability {
      startDate
      endDate
      type
    }
    photos {
      resized_medium
    }
    address
    city {
      id
    }
    postal
    unitPrice
    sqFtArea
    features
    propertyType
    bookings {
      startDate
      endDate
    }
  }
}
    `;
export const SearchListingsDocument = gql`
    query searchListings($cityId: Int!, $limit: Int!, $offset: Int!) {
  searchListings(input: {cityId: $cityId, limit: $limit, offset: $offset}) {
    id
    title
    description
    address
    postal
    features
    sqFtArea
    availability {
      startDate
      endDate
    }
    bookings {
      startDate
      endDate
    }
    author {
      id
      first_name
      last_name
    }
    photos {
      resized_small
    }
    propertyType
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getHomeGalleryListings(variables?: GetHomeGalleryListingsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetHomeGalleryListingsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHomeGalleryListingsQuery>(GetHomeGalleryListingsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHomeGalleryListings');
    },
    getConversations(variables: GetConversationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetConversationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetConversationsQuery>(GetConversationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getConversations');
    },
    MeQuery(variables?: MeQueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MeQueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeQueryQuery>(MeQueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'MeQuery');
    },
    myListingsQuery(variables: MyListingsQueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MyListingsQueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MyListingsQueryQuery>(MyListingsQueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'myListingsQuery');
    },
    retrieveListing(variables: RetrieveListingQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RetrieveListingQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RetrieveListingQuery>(RetrieveListingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'retrieveListing');
    },
    searchListings(variables: SearchListingsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SearchListingsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchListingsQuery>(SearchListingsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'searchListings');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;