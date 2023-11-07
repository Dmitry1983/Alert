import React from 'react';
import {StyleProp, ViewStyle, TextStyle, View, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import * as store from '../../../store';
import * as Icon from '../../../assets/icons';
import {Textual} from '../Textual';
import {Link} from '../Link';

interface Styles {
  container: (variant: TVariant) => StyleProp<ViewStyle>;
  leftContainer: StyleProp<ViewStyle>;
  group: StyleProp<ViewStyle>;
  leftIcon: StyleProp<ViewStyle>;
  link: StyleProp<ViewStyle>;
  close: (pressed: boolean) => StyleProp<ViewStyle>;
}

const styles: Styles = {
  container: variant => ({
    borderRadius: variant === 'default' ? 12 : 0,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  leftContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  group: {
    flex: 1,
  },
  leftIcon: {
    width: 16,
    marginRight: 8,
  },
  link: {
    paddingTop: 8,
  },
  close: pressed => ({
    width: 16,
    height: 16,
    opacity: pressed ? 0.7 : 1,
  }),
};

type TType = 'info' | 'alert' | 'warning' | 'success';

type TVariant = 'default' | 'popup';

interface IProps {
  style?: StyleProp<TextStyle>;
  type: TType;
  variant: TVariant;
  title: string;
  message: string;
  linkTitle: string;
  onClose: () => void;
  onLink: () => void;
}

const backgroundColors = (theme: any, type: TType) => {
  const colors = {
    info: theme.neutral[200],
    alert: theme.alerterror[100],
    warning: theme.warning[100],
    success: theme.success[100],
  };
  return colors[type] ?? colors.info;
};

const textColors = (theme: any, type: TType) => {
  const colors = {
    info: theme.primary[500],
    alert: theme.alerterror[500],
    warning: theme.warning[500],
    success: theme.success[500],
  };
  return colors[type] ?? colors.info;
};

const iconType = (color: string, type: TType) => {
  const icons = {
    info: <Icon.InfoAltFillSvg color={color} />,
    alert: <Icon.CloseRoundFillSvg color={color} />,
    warning: <Icon.AtentionFillSvg color={color} />,
    success: <Icon.CheckRoundFillSvg color={color} />,
  };
  return icons[type] ?? icons.info;
};

export const Alert: React.FC<IProps> = props => {
  const {
    style,
    type = 'info',
    variant = 'default',
    title = 'Title',
    message = 'message',
    linkTitle,
    onClose,
    onLink,
  } = props;
  const theme = useSelector(store.themeSelector);

  const backgroundColor = backgroundColors(theme, type);
  const color = textColors(theme, type);
  const messageColor = theme.neutral[800];

  const LeftIcon = iconType(color, type);

  return (
    <View style={[styles.container(variant), style, {backgroundColor}]}>
      <View style={styles.leftContainer}>
        <View style={styles.leftIcon}>{LeftIcon}</View>
        <View style={styles.group}>
          <Textual numberOfLines={1} type="H2" style={{color}}>
            {title}
          </Textual>

          <Textual type="T1" style={{color: messageColor}}>
            {message}
          </Textual>

          {linkTitle && (
            <Link
              style={styles.link}
              title={linkTitle}
              onPress={onLink}
              type="rightIcon"
            />
          )}
        </View>
      </View>

      {onClose && (
        <Pressable
          hitSlop={16}
          style={({pressed}) => styles.close(pressed)}
          onPress={onClose}>
          <Icon.CloseRoundSvg />
        </Pressable>
      )}
    </View>
  );
};
