// deno-lint-ignore-file no-namespace

export type Attach<T extends Constraint.Dict> = Attach.Dict<T>;
export namespace Attach {
  type Determine<T extends Identifier, U = unknown> = unknown extends U
    ? { type: T }
    : { type: T; value: U };

  type TupleDetermine<T extends Identifier, U = unknown> = unknown extends U
    ? [type: T]
    : [type: T, value: U];

  export type XOR<T extends Constraint.Dict> = {
    [K in keyof T]: { [L in K]: T[K] };
  }[keyof T];

  export type Enum<
    T extends Constraint.Enum,
    U extends Partial<Record<keyof T, unknown>>,
  > = {
    [K in keyof T]: Determine<T[K], U[K]>;
  }[keyof T];

  export type Dict<T extends Constraint.Dict> = {
    [K in keyof T]: Determine<K, T[K]>;
  }[keyof T];

  export type DictTuple<T extends Constraint.Dict> = {
    [K in keyof T]: TupleDetermine<K, T[K]>;
  }[keyof T];

  export type EnumTuple<
    T extends Constraint.Enum,
    U extends Partial<Record<keyof T, unknown>>,
  > = {
    [K in keyof T]: TupleDetermine<T[K], U[K]>;
  }[keyof T];
}

export type Key = string | number | symbol;
export type Identifier = Key | boolean | null | undefined;

export namespace Constraint {
  export type Enum = Record<string, string | number>;
  export type Dict = Record<Key, unknown>;
}
