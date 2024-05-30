export function SectionHeader({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className={"w-full"}>
            <p className={"text-xl font-bold"}>{title}</p>
            <p className={"text-md text-gray-500"}>{description}</p>
        </div>
    );
}
