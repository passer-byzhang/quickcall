import { Button, ConfigProvider, Space } from "antd";

type Props = {
  onClick: () => void;
  msg: string;
  type: "call" | "payable" | "nonpayable";
};

export function CustomButton({ onClick, msg, type }: Props) {
  if (type === "call") {
    return (
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBg: "#2577E4",
              defaultHoverColor: "text-custom-white",
            },
          },
        }}
      >
        <Space>
          <Button
            onClick={onClick}
            className="bg-custom-blue text-custom-white hover:bg-custom-blue hover:text-custom-white mb-2 rounded-none"
          >
            {msg}
          </Button>
        </Space>
      </ConfigProvider>
    );
  } else if (type === "payable") {
    return (
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBg: "#EE4A18",
              defaultHoverColor: "text-custom-white",
            },
          },
        }}
      >
        <Space>
          <Button
            onClick={onClick}
            className="bg-custom-red text-custom-white hover:bg-custom-red hover:text-custom-white mb-2 rounded-none"
          >
            {msg}
          </Button>
        </Space>
      </ConfigProvider>
    );
  } else if (type === "nonpayable") {
    return (
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBg: "#F39324",
              defaultHoverColor: "text-custom-white",
            },
          },
        }}
      >
        <Space>
          <Button
            onClick={onClick}
            className="bg-custom-orange text-custom-white hover:bg-custom-orange hover:text-custom-white mb-2 rounded-none"
          >
            {msg}
          </Button>
        </Space>
      </ConfigProvider>
    );
  }
}
