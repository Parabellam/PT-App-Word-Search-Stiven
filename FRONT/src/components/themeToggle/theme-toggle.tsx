import { Button } from "@heroui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Tooltip } from "@heroui/tooltip";
import ThemeToggleViewModel from "./theme-toggle.viewmodel";

const ThemeToggle = () => {
  const { mainButtonIcon, themeOptions, changeTheme } = ThemeToggleViewModel();

  return (
    <div className="fixed top-3 right-3 z-50">
      <Popover placement="right">
        <PopoverTrigger>
          <Button
            size="sm"
            variant="light"
            className="text-2xl transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Cambiar tema"
          >
            <Tooltip content="Cambiar tema" offset={10} closeDelay={0}>
              {mainButtonIcon}
            </Tooltip>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 space-y-1">
          {themeOptions.map((option) => (
            <Button
              key={option.value}
              size="sm"
              variant="light"
              onPress={() => changeTheme(option.value)}
              className={`w-full justify-start transition-all duration-200`}
              aria-label={`Cambiar a tema ${option.label.toLowerCase()}`}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThemeToggle;
