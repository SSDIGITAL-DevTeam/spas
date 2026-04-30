import { JSX } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { MdAdd } from "react-icons/md";

type Action = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type Props = {
  title: string;
  description?: string;
  action?: Action;
};

export default function PageHeader({ title, description, action }: Props): JSX.Element {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
        {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
      </div>
      {action && (
        action.href ? (
          <Button
            as={Link}
            href={action.href}
            color="primary"
            size="sm"
            startContent={<MdAdd className="w-4 h-4" />}
          >
            {action.label}
          </Button>
        ) : (
          <Button
            onPress={action.onClick}
            color="primary"
            size="sm"
            startContent={<MdAdd className="w-4 h-4" />}
          >
            {action.label}
          </Button>
        )
      )}
    </div>
  );
}
