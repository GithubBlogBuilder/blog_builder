"use client";
import { BlogTagEntity } from "@/domain/entities/PostEntity";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

function lightenColor(color: string, percent: number) {
    // 确保颜色是以 #RRGGBB 格式表示的
    if (color.startsWith("#")) {
        color = color.slice(1);
    }

    // 解析 RGB 值
    let r = parseInt(color.slice(0, 2), 16);
    let g = parseInt(color.slice(2, 4), 16);
    let b = parseInt(color.slice(4, 6), 16);

    // 增加 RGB 值，使其逐步靠近 255
    r = Math.min(255, Math.floor(r + ((255 - r) * percent) / 100));
    g = Math.min(255, Math.floor(g + ((255 - g) * percent) / 100));
    b = Math.min(255, Math.floor(b + ((255 - b) * percent) / 100));

    // 将新的 RGB 值转换回十六进制格式
    const newColor =
        "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

    return newColor;
}

export function BlogTagChip({ tag }: { tag: BlogTagEntity }) {
    const { theme, setTheme } = useTheme();

    const r = parseInt(tag.color.slice(0, 2), 16);
    const g = parseInt(tag.color.slice(2, 4), 16);
    const b = parseInt(tag.color.slice(4, 6), 16);

    // 計算亮度
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

    // 根據亮度值判斷顏色的亮暗
    const isBrightness = brightness > 128 ? "light" : "dark";
    const colorToLowerCase = tag.color.toLowerCase();

    function getBgColor(color: string) {
        if (theme === "dark") {
            return `#${color}2A`;
        }
        return `#${color}`;
    }

    function getTextColor(color: string) {
        if (theme === "dark") {
            return isBrightness === "dark"
                ? lightenColor(`#${color}`, 50)
                : `#${color}`;
        } else {
            return isBrightness === "light" ? `#000000` : `#ffffff`;
        }
    }

    return (
        <div
            key={tag.id}
            className={cn(
                `w-fit flex flex-col justify-center items-center rounded-xl px-2 `
            )}
            style={{
                backgroundColor: getBgColor(tag.color),
                border: isBrightness ? `2px solid #${tag.color}1A` : "0px",
                verticalAlign: "middle",
            }}
        >
            <span
                className={"text-[12px] font-semibold "}
                style={{
                    color: getTextColor(tag.color),
                }}
            >
                {`# ${tag.label}`}
            </span>
        </div>
    );
}
