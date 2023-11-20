import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

type ClassesType = {
  id: string;
  name: string;
  department: string;
};

function Classes() {
  const [state, setState] = useState({
    loading: false,
  });
  const [avaliableClasses, setAvaliableClasses] = useState<ClassesType[]>([]);
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const res = fetch('/api/classes').then((res) => res.json());
    res.then((data: { rows: ClassesType[] }) => {
      const { rows } = data;
      setAvaliableClasses(rows);
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
      console.log(data);
    });
  }, []);
  return (
    <Select name="class_id" disabled={state.loading}>
      <SelectTrigger>
        <SelectValue placeholder="Select class" />
      </SelectTrigger>
      <SelectContent aria-disabled={state.loading}>
        <SelectGroup>
          <SelectLabel>Classes</SelectLabel>
          {avaliableClasses.map((row) => (
            <SelectItem key={row.id} value={row.id}>
              {row.name} - {row.department}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Classes;
