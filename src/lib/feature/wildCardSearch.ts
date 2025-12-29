export function wildCardSearch<T>(list: T[], input: string, specifyKey?: keyof T): T[] {
  const searchText = (item: T): boolean => {
    for (const key in item) {
      const searchKey = specifyKey || (key as keyof T);
      const value = item[searchKey];

      if (value == null) {
        continue;
      }

      if (value.toString().toUpperCase().includes(input.toString().toUpperCase())) {
        return true;
      }
    }
    return false;
  };

  return list.filter((value) => searchText(value));
}
