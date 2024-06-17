import _ from 'lodash';

interface TransformSchema {
  [key: string]: string | ((item: any, data: any) => any);
}

interface Schemas {
  [key: string]: TransformSchema;
}

export function mergeData(data: any, schemas: Schemas): any {
  const result: { [key: string]: any[] } = {};

  // Process each schema
  for (const [key, schema] of Object.entries(schemas)) {
    result[key] = data[key].map((item: any) => {
      const mergedItem: { [key: string]: any } = { ...item };

      for (const [field, transform] of Object.entries(schema)) {
        if (typeof transform === 'string') {
          mergedItem[field] = _.get(item, transform);
        } else if (typeof transform === 'function') {
          mergedItem[field] = transform(item, data);
        }
      }

      return mergedItem;
    });
  }
  return result;
}
