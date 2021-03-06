/* tslint:disable */
declare module 'react-native-gifted-chat' {
  // TODO: remove this after new version of 'react-native-gifted-chat' with typing shifted is there
  // See: https://github.com/FaridSafi/react-native-gifted-chat/issues/876
  import * as React from 'react'
  import {
    ImageProperties,
    ImageStyle,
    ListViewProperties,
    TextInputProperties,
    TextProperties,
    TextStyle,
    ViewStyle,
  } from 'react-native'

  export interface LeftRightStyle<T> {
    left: T
    right: T
  }

  export interface User {
    _id: any
    name?: string
    avatar?: string
  }

  export interface IChatMessage {
    _id: any
    text: string
    createdAt: Date
    user: {
      _id: any
      name: string
      avatar: string
    }
    image?: string
    received?: boolean
    sent?: boolean
  }

  export interface ISystemMessage {
    _id: any
    text: string
    createdAt: Date
    system: true
  }

  export type IMessage = IChatMessage | ISystemMessage

  interface ActionsProps {
    options?: any
    optionTintColor?: string
    wrapperStyle?: ViewStyle
    containerStyle?: ViewStyle
    iconTextStyle?: ViewStyle
    // todo: onSend is not used
    onSend?(): void
    icon?(): void
  }

  export class Actions extends React.Component<ActionsProps> {}

  interface AvatarProps {
    renderAvatarOnTop: boolean
    position: 'left' | 'right'
    currentMessage: IChatMessage
    previousMessage: IMessage
    nextMessage: IMessage
    containerStyle: {
      left: any
      right: any
    }
    imageStyle: {
      left: any
      right: any
    }
    onPressAvatar(): void
    renderAvatar(props: AvatarProps): JSX.Element
    // TODO: remove in next major release
    isSameDay(currentMessage: IMessage, message: IMessage): boolean
    isSameUser(currentMessage: IMessage, message: IMessage): boolean
  }

  export class Avatar extends React.Component<AvatarProps> {}

  interface BubbleProps {
    user: User
    touchableProps?: object
    position?: 'left' | 'right'
    currentMessage?: IMessage
    nextMessage?: IMessage
    previousMessage?: IMessage
    containerStyle?: LeftRightStyle<ViewStyle>
    wrapperStyle: LeftRightStyle<ViewStyle>
    bottomContainerStyle: LeftRightStyle<ViewStyle>
    tickStyle: TextStyle
    containerToNextStyle: LeftRightStyle<ViewStyle>
    containerToPreviousStyle: LeftRightStyle<ViewStyle>
    onLongPress?(): void
    renderMessageImage?(messageImageProps: MessageImageProps): React.ReactNode
    renderMessageText?(messageTextProps: MessageTextProps): React.ReactNode
    renderCustomView?(bubbleProps: BubbleProps): React.ReactNode
    renderTime?(timeProps: TimeProps): React.ReactNode
    renderTicks?(currentMessage: IMessage): React.ReactNode
    // TODO: remove in next major release
    isSameDay?(currentMessage: IMessage, nextMessage: IMessage): boolean
    isSameUser?(currentMessage: IMessage, nextMessage: IMessage): boolean
  }

  export class Bubble extends React.Component<BubbleProps> {}

  interface ComposerProps {
    composerHeight?: number
    text?: string
    placeholder?: string
    placeholderTextColor?: string
    textInputProps?: Partial<TextInputProperties>
    multiline?: boolean
    textInputStyle?: TextInputProperties['style']
    textInputAutoFocus?: boolean
    keyboardAppearance: TextInputProperties['keyboardAppearance']
    onTextChanged?(text: string): void
    onInputSizeChanged?(contentSize: number): void
  }

  export class Composer extends React.Component<ComposerProps> {}

  interface DayProps {
    currentMessage?: IMessage
    previousMessage?: IMessage
    containerStyle?: ViewStyle
    wrapperStyle?: ViewStyle
    textStyle?: TextStyle
    dateFormat?: string
    // TODO: remove in next major release
    isSameDay?(currentMessage: IMessage, nextMessage: IMessage): boolean
    isSameUser?(currentMessage: IMessage, nextMessage: IMessage): boolean
  }

  export class Day extends React.Component<DayProps> {}

  interface GiftedAvatarProps {
    user?: User
    avatarStyle?: ImageStyle
    textStyle?: TextStyle
    onPress?(): void
  }

  export class GiftedAvatarProps extends React.Component<GiftedAvatarProps> {}

  export interface GiftedChatProps {
    /* Messages to display */
    messages?: IMessage[]
    /* Input text; default is undefined, but if specified, it will override GiftedChat's internal state */
    text?: string
    /* Placeholder when text is empty; default is 'Type a message...' */
    placeholder?: string
    /* User sending the messages: { _id, name, avatar } */
    user?: User
    /*  Locale to localize the dates */
    locale?: string
    /* Format to use for rendering times; default is 'LT' */
    timeFormat?: string
    /* Format to use for rendering dates; default is 'll' */
    dateFormat?: string
    /* Animates the view when the keyboard appears */
    isAnimated?: boolean
    /* Enables the "Load earlier messages" button */
    loadEarlier?: boolean
    /*Display an ActivityIndicator when loading earlier messages*/
    isLoadingEarlier?: boolean
    /* Whether to render an avatar for the current user; default is false, only show avatars for other users */
    showUserAvatar?: boolean
    /* When false, avatars will only be displayed when a consecutive message is from the same user on the same day; default is false */
    showAvatarForEveryMessage?: boolean
    /* Render the message avatar at the top of consecutive messages, rather than the bottom; default is false */
    renderAvatarOnTop?: boolean
    /* Reverses display order of messages; default is true */
    inverted?: boolean
    /* Extra props to be passed to the <Image> component created by the default renderMessageImage */
    imageProps?: MessageProps
    /*Extra props to be passed to the MessageImage's Lightbox */
    lightboxProps?: any
    /*Distance of the chat from the bottom of the screen (e.g. useful if you display a tab bar) */
    bottomOffset?: number
    /* Minimum height of the input toolbar; default is 44 */
    minInputToolbarHeight?: number
    /*Extra props to be passed to the messages <ListView>; some props can't be overridden, see the code in MessageContainer.render() for details */
    listViewProps?: any
    /*  Extra props to be passed to the <TextInput> */
    textInputProps?: any
    /*Determines whether the keyboard should stay visible after a tap; see <ScrollView> docs */
    keyboardShouldPersistTaps?: any
    /*Max message composer TextInput length */
    maxInputLength?: number
    /* Generate an id for new messages. Defaults to UUID v4, generated by uuid */
    messageIdGenerator?<T extends any>(message: T): string
    /* Callback when sending a message */
    onSend?<T extends IMessage>(messages: T[]): void
    /*Callback when loading earlier messages*/
    onLoadEarlier?(): void
    /*  Render a loading view when initializing */
    renderLoading?(): React.ReactNode
    /* Custom "Load earlier messages" button */
    renderLoadEarlier?(props: LoadEarlierProps): React.ReactNode
    /* Custom message avatar; set to null to not render any avatar for the message */
    renderAvatar?(props: AvatarProps): React.ReactNode
    /* Callback when a message avatar is tapped */
    onPressAvatar?(user: User): void
    /* Custom message bubble */
    renderBubble?(props: BubbleProps): React.ReactNode
    /*Custom system message */
    renderSystemMessage?(props: SystemMessageProps): React.ReactNode
    /* Callback when a message bubble is long-pressed; default is to show an ActionSheet with "Copy Text" (see example using showActionSheetWithOptions()) */
    onLongPress?(context: any, message: any): void
    /*Custom message container */
    renderMessage?(message: IMessage): React.ReactNode
    /* Custom message text */
    renderMessageText?(messageText: MessageTextProps): React.ReactNode
    /* Custom message image */
    renderMessageImage?(props: MessageImageProps): React.ReactNode
    /* Custom view inside the bubble */
    renderCustomView?(props: any): React.ReactNode
    /*Custom day above a message*/
    renderDay?(props: DayProps): React.ReactNode
    /* Custom time inside a message */
    renderTime?(props: TimeProps): React.ReactNode
    /* Custom footer component on the ListView, e.g. 'User is typing...' */
    renderFooter?(): React.ReactNode
    /* Custom component to render below the MessageContainer (separate from the ListView) */
    renderChatFooter?(): React.ReactNode
    /* Custom message composer container */
    renderInputToolbar?(props: InputToolbarProps): React.ReactNode
    /*  Custom text input message composer */
    renderComposer?(): React.ReactNode
    /* Custom action button on the left of the message composer */
    renderActions?(): React.ReactNode
    /* Custom send button; you can pass children to the original Send component quite easily, for example to use a custom icon (example) */
    renderSend?(): React.ReactNode
    /*Custom second line of actions below the message composer */
    renderAccessory?(): React.ReactNode
    /*Callback when the Action button is pressed (if set, the default actionSheet will not be used) */
    onPressActionButton?(): void
    /* Callback when the input text changes */
    onInputTextChanged?(text: string): void
    /* Custom parse patterns for react-native-parsed-text used to linkify message content (like URLs and phone numbers) */
    parsePatterns?(linkStyle: any): React.ReactNode
  }

  export class GiftedChat extends React.Component<GiftedChatProps> {
    public static append(
      currentMessages: IMessage[],
      messages: IMessage[],
      inverted?: boolean,
    ): IMessage[]
    public static prepend(
      currentMessages: IMessage[],
      messages: IMessage[],
      inverted?: boolean,
    ): IMessage[]
  }

  interface InputToolbarProps {
    containerStyle?: ViewStyle
    primaryStyle?: ViewStyle
    accessoryStyle?: ViewStyle
    renderAccessory?(props: InputToolbarProps): React.ReactNode
    renderActions?(props: InputToolbarProps): React.ReactNode
    renderSend?(props: InputToolbarProps): React.ReactNode
    renderComposer?(props: InputToolbarProps): React.ReactNode
    onPressActionButton?(): void
  }
  export class InputToolbar extends React.Component<InputToolbarProps> {}

  interface LoadEarlierProps {
    isLoadingEarlier: boolean
    label?: string
    containerStyle?: ViewStyle
    wrapperStyle?: ViewStyle
    textStyle?: TextStyle
    activityIndicatorStyle?: ViewStyle
    onLoadEarlier?(): void
  }

  export class LoadEarlier extends React.Component<LoadEarlierProps> {}

  interface MessageProps {
    showUserAvatar?: boolean
    position?: 'left' | 'right'
    currentMessage?: IMessage
    nextMessage?: IMessage
    previousMessage?: IMessage
    user?: User
    inverted?: boolean
    containerStyle: LeftRightStyle<ViewStyle>
    // TODO: this is not used
    renderAvatar(props: AvatarProps): React.ReactNode
    renderBubble(props: BubbleProps): React.ReactNode
    renderDay(props: DayProps): React.ReactNode
    renderSystemMessage(props: SystemMessageProps): React.ReactNode
  }

  export class Message extends React.Component<MessageProps> {}

  interface MessageContainerProps {
    messages?: IMessage[]
    user?: User
    listViewProps: Partial<ListViewProperties>
    inverted?: boolean
    loadEarlier?: boolean
    // todo: should be InvertibleScrollView props
    invertibleScrollViewProps?: object
    renderFooter?(props: MessageContainerProps): React.ReactNode
    renderMessage?(props: MessageProps): React.ReactNode
    renderLoadEarlier?(props: LoadEarlierProps): React.ReactNode
    // todo: not used
    onLoadEarlier?(): void
  }

  export class MessageContainer extends React.Component<
    MessageContainerProps
  > {}

  interface MessageImageProps {
    currentMessage?: IMessage
    containerStyle?: ViewStyle
    imageStyle?: ImageStyle
    imageProps?: Partial<ImageProperties>
    // todo: should be LightBox properties
    lightboxProps?: object
  }

  export class MessageImage extends React.Component<MessageImageProps> {}

  interface MessageTextProps {
    position: 'left' | 'right'
    currentMessage?: IMessage
    containerStyle?: LeftRightStyle<ViewStyle>
    textStyle?: LeftRightStyle<TextStyle>
    linkStyle?: LeftRightStyle<TextStyle>
    textProps?: TextProperties
    customTextStyle?: TextStyle
    parsePatterns?(linkStyle: TextStyle): any
  }

  export class MessageText extends React.Component<MessageTextProps> {}

  interface SendProps {
    text?: string
    label?: string
    containerStyle?: ViewStyle
    textStyle?: TextStyle
    children?: React.ReactNode
    onSend?({ text }: { text: string }, b: boolean): void
  }

  export class Send extends React.Component<SendProps> {}

  interface SystemMessageProps {
    currentMessage?: IMessage
    containerStyle?: ViewStyle
    wrapperStyle?: ViewStyle
    textStyle?: TextStyle
  }

  export class ISystemMessage extends React.Component<SystemMessageProps> {}

  interface TimeProps {
    position?: 'left' | 'right'
    currentMessage?: IMessage
    containerStyle?: LeftRightStyle<ViewStyle>
    textStyle?: LeftRightStyle<TextStyle>
    timeFormat?: string
  }

  export class Time extends React.Component<TimeProps> {}

  export interface utils {
    isSameUser(currentMessage?: IMessage, message?: IMessage): boolean
    isSameDay(currentMessage?: IMessage, message?: IMessage): boolean
    isSameTime(currentMessage?: IMessage, message?: IMessage): boolean
  }

  export const utils: utils
}
