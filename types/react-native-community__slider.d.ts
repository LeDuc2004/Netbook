declare module "@react-native-community/slider" {
  import { ViewProps } from "react-native";

  export interface SliderProps extends ViewProps {
    value?: number;
    minimumValue?: number;
    maximumValue?: number;
    step?: number;
    minimumTrackTintColor?: string;
    maximumTrackTintColor?: string;
    thumbTintColor?: string;
    onValueChange?: (value: number) => void;
    onSlidingStart?: () => void;
    onSlidingComplete?: (value: number) => void;
    tapToSeek?: boolean;
    enabled?: boolean;
  }

  export default class Slider extends React.Component<SliderProps> {}
}
