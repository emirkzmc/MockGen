import { SchemaField } from "@/domain/schemaDomains";
import { PanelInput } from "@/components/ui/PanelInput";
import { PanelSelect } from "@/components/ui/PanelSelect";
import { PanelIconButton } from "@/components/ui/PanelIconButton";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { Reorder, useDragControls, DragControls } from "framer-motion";

export function DraggableFieldRow(props: { field: SchemaField, updateField: (id: string, key: keyof SchemaField, value: string | SchemaField[]) => void, removeField: (id: string) => void, addSubField: (parentId: string) => void, reorderSubField: (parentId: string, newSubFields: SchemaField[]) => void, depth?: number }) {
  const dragControls = useDragControls();
  return (
    <Reorder.Item value={props.field} dragListener={false} dragControls={dragControls} className="relative group">
      <FieldRow {...props} dragControls={dragControls} />
    </Reorder.Item>
  );
}

export function FieldRow({ field, updateField, removeField, addSubField, reorderSubField, depth = 0, dragControls }: { field: SchemaField, updateField: (id: string, key: keyof SchemaField, value: string | SchemaField[]) => void, removeField: (id: string) => void, addSubField: (parentId: string) => void, reorderSubField: (parentId: string, newSubFields: SchemaField[]) => void, depth?: number, dragControls?: DragControls }) {
  return (
    <div className="flex flex-col space-y-3 relative">
      {depth > 0 && (
        <>
          <div className="absolute -left-5 -top-3 bottom-5 w-px bg-black/10 dark:bg-white/10" />
          <div className="absolute -left-5 bottom-5 w-4 h-px bg-black/10 dark:bg-white/10" />
        </>
      )}
      <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 group w-full">
        <div
          className="cursor-grab active:cursor-grabbing flex items-center justify-center pt-3 opacity-40 group-hover:opacity-100 transition-opacity text-black/40 dark:text-white/30 hover:text-black dark:hover:text-white pb-3 sm:pb-0"
          onPointerDown={(e) => dragControls?.start(e)}
          style={{ touchAction: "none" }}
        >
          <GripVertical className="w-5 h-5" />
        </div>
        <div className="flex-1 w-full">
          {depth === 0 && <label className="block text-[10px] text-black/40 dark:text-white/30 uppercase tracking-widest mb-2 opacity-40 group-hover:opacity-100 transition-opacity">Field Name</label>}
          <PanelInput
            type="text"
            value={field.name}
            onChange={(e) => updateField(field.id, "name", e.target.value)}
            placeholder="field_name"
            className="px-2 py-2 text-sm font-mono border-black/20 dark:border-white/10"
          />
        </div>
        <div className="flex-1 w-full">
          {depth === 0 && <label className="block text-[10px] text-black/40 dark:text-white/30 uppercase tracking-widest mb-2 opacity-40 group-hover:opacity-100 transition-opacity">Type</label>}
          <PanelSelect
            value={field.type}
            onChange={(e) => updateField(field.id, "type", e.target.value as SchemaField["type"])}
            options={[
              { label: "ID (Sequential)", value: "id" },
              { label: "String", value: "string" },
              { label: "Number", value: "number" },
              { label: "Boolean", value: "boolean" },
              { label: "UUID", value: "uuid" },
              { label: "Date", value: "date" },
              { label: "Object", value: "object" },
              { label: "Array", value: "array" },
              { label: "Email", value: "email" },
              { label: "Full Name", value: "name" },
              { label: "First Name", value: "firstName" },
              { label: "Last Name", value: "lastName" },
              { label: "Age", value: "age" },
              { label: "Is Active", value: "isActive" },
              { label: "City", value: "city" },
              { label: "Phone", value: "phone" },
            ]}
            className="px-2 py-2 text-sm border-black/20 dark:border-white/10 w-full"
          />
        </div>
        <PanelIconButton
          icon={<Trash2 className="w-4 h-4" />}
          onClick={() => removeField(field.id)}
          variant="danger"
          className={depth === 0 ? "pb-3" : ""}
          title="Delete"
        />
      </div>

      {field.type === 'array' && (
        <div className="flex flex-col space-y-4 pl-8 pt-2">
          <Reorder.Group axis="y" values={field.subFields || []} onReorder={(newOrder) => reorderSubField(field.id, newOrder)} className="space-y-4">
            {field.subFields?.map((subField) => (
              <DraggableFieldRow
                key={subField.id}
                field={subField}
                updateField={updateField}
                removeField={removeField}
                addSubField={addSubField}
                reorderSubField={reorderSubField}
                depth={depth + 1}
              />
            ))}
          </Reorder.Group>
          <div className="relative">
            <div className="absolute -left-5 -top-4 bottom-4 w-px bg-black/10 dark:bg-white/10" />
            <div className="absolute -left-5 bottom-4 w-4 h-px bg-black/10 dark:bg-white/10" />
            <button
              onClick={() => addSubField(field.id)}
              className="cursor-pointer text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white uppercase tracking-widest flex items-center space-x-1 transition-colors mt-2"
            >
              <Plus className="w-3 h-3" />
              <span>Add Item Field</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
