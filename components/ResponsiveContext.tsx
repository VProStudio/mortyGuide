// Context provider for responsive design that adapts fonts and layout based on screen width
import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { Dimensions } from 'react-native';
import { FONT_GROUPS, LAYOUT_GROUPS } from '@/utils/constants';

type ResponsiveContextType = {
  screenWidth: number;
  fonts: {
    name: number;
    card: number;
    picker: number;
    system: number;
    arrow: number;
  };
  layout: {
    nameMarginLeft: number;
    nameAlign: string;
    rowMarginTop: number;
    row: string;
    imageHeight: number;
    imageWidth: number;
  };
};

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(
  undefined,
);

export const ResponsiveProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize screen width state with current window dimensions
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );

  // Subscribe to screen dimension changes and cleanup on unmount
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });

    return () => subscription?.remove();
  }, []);

  const responsive = useMemo(() => {
    let fontGroup, layoutGroup;

    if (screenWidth < 350) {
      fontGroup = FONT_GROUPS.NARROW;
      layoutGroup = LAYOUT_GROUPS.NORMAL;
    } else if (screenWidth > 1120) {
      fontGroup = FONT_GROUPS.WIDE;
      layoutGroup = LAYOUT_GROUPS.ULTRA_WIDE;
    } else if (screenWidth > 590) {
      fontGroup = FONT_GROUPS.NORMAL;
      layoutGroup = LAYOUT_GROUPS.WIDE;
    } else {
      fontGroup = FONT_GROUPS.NORMAL;
      layoutGroup = LAYOUT_GROUPS.NORMAL;
    }

    // Transform font and layout groups into structured responsive configuration object
    return {
      screenWidth,
      fonts: {
        name: fontGroup.NAME,
        card: fontGroup.CARD_TEXT,
        picker: fontGroup.PICKER,
        system: fontGroup.SYSTEM,
        arrow: fontGroup.ARROW,
      },
      layout: {
        nameMarginLeft: layoutGroup.NAME_MARGIN_LEFT,
        nameAlign: layoutGroup.NAME_ALIGN,
        rowMarginTop: layoutGroup.ROW_MARGIN_TOP,
        row: layoutGroup.ROW,
        imageHeight: layoutGroup.IMAGE_HEIGHT,
        imageWidth: layoutGroup.IMAGE_WIDTH,
      },
    };
  }, [screenWidth]);

  return (
    <ResponsiveContext.Provider value={responsive}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = () => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsive must be used within ResponsiveProvider');
  }
  return context;
};
