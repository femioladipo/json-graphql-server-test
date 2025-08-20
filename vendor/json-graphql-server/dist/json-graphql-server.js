import re, { proxy as kt } from "xhr-mock";
import { GraphQLScalarType as xt, GraphQLError as xe, GraphQLNonNull as te, GraphQLID as ne, GraphQLList as P, GraphQLBoolean as Ne, GraphQLString as M, GraphQLInt as w, GraphQLFloat as me, GraphQLObjectType as fe, GraphQLInputObjectType as it, isListType as bt, GraphQLSchema as St, extendSchema as At, parse as Dt, printSchema as Lt, graphql as Ct } from "graphql";
import { makeExecutableSchema as Kt } from "@graphql-tools/schema";
import { camelize as ie, pluralize as X, singularize as Oe } from "inflection";
import { GraphQLJSON as ve } from "graphql-type-json";
var ye = {}, $ = {}, se = {}, be;
function rt() {
  if (be) return se;
  be = 1, Object.defineProperty(se, "__esModule", {
    value: !0
  }), se.devAssert = e;
  function e(n, c) {
    if (!!!n)
      throw new Error(c);
  }
  return se;
}
var oe = {}, Se;
function Ie() {
  if (Se) return oe;
  Se = 1, Object.defineProperty(oe, "__esModule", {
    value: !0
  }), oe.inspect = c;
  const e = 10, n = 2;
  function c(d) {
    return r(d, []);
  }
  function r(d, y) {
    switch (typeof d) {
      case "string":
        return JSON.stringify(d);
      case "function":
        return d.name ? `[function ${d.name}]` : "[function]";
      case "object":
        return s(d, y);
      default:
        return String(d);
    }
  }
  function s(d, y) {
    if (d === null)
      return "null";
    if (y.includes(d))
      return "[Circular]";
    const t = [...y, d];
    if (u(d)) {
      const l = d.toJSON();
      if (l !== d)
        return typeof l == "string" ? l : r(l, t);
    } else if (Array.isArray(d))
      return m(d, t);
    return i(d, t);
  }
  function u(d) {
    return typeof d.toJSON == "function";
  }
  function i(d, y) {
    const t = Object.entries(d);
    return t.length === 0 ? "{}" : y.length > n ? "[" + E(d) + "]" : "{ " + t.map(
      ([N, v]) => N + ": " + r(v, y)
    ).join(", ") + " }";
  }
  function m(d, y) {
    if (d.length === 0)
      return "[]";
    if (y.length > n)
      return "[Array]";
    const t = Math.min(e, d.length), l = d.length - t, N = [];
    for (let v = 0; v < t; ++v)
      N.push(r(d[v], y));
    return l === 1 ? N.push("... 1 more item") : l > 1 && N.push(`... ${l} more items`), "[" + N.join(", ") + "]";
  }
  function E(d) {
    const y = Object.prototype.toString.call(d).replace(/^\[object /, "").replace(/]$/, "");
    if (y === "Object" && typeof d.constructor == "function") {
      const t = d.constructor.name;
      if (typeof t == "string" && t !== "")
        return t;
    }
    return y;
  }
  return oe;
}
var Z = {}, Ae;
function Rt() {
  if (Ae) return Z;
  Ae = 1, Object.defineProperty(Z, "__esModule", {
    value: !0
  }), Z.instanceOf = void 0;
  var e = /* @__PURE__ */ Ie();
  const c = (
    /* c8 ignore next 6 */
    // FIXME: https://github.com/graphql/graphql-js/issues/2317
    globalThis.process && // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "production" ? function(s, u) {
      return s instanceof u;
    } : function(s, u) {
      if (s instanceof u)
        return !0;
      if (typeof s == "object" && s !== null) {
        var i;
        const m = u.prototype[Symbol.toStringTag], E = (
          // We still need to support constructor's name to detect conflicts with older versions of this library.
          Symbol.toStringTag in s ? s[Symbol.toStringTag] : (i = s.constructor) === null || i === void 0 ? void 0 : i.name
        );
        if (m === E) {
          const d = (0, e.inspect)(s);
          throw new Error(`Cannot use ${m} "${d}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
        }
      }
      return !1;
    }
  );
  return Z.instanceOf = c, Z;
}
var De;
function st() {
  if (De) return $;
  De = 1, Object.defineProperty($, "__esModule", {
    value: !0
  }), $.Source = void 0, $.isSource = s;
  var e = /* @__PURE__ */ rt(), n = /* @__PURE__ */ Ie(), c = /* @__PURE__ */ Rt();
  class r {
    constructor(i, m = "GraphQL request", E = {
      line: 1,
      column: 1
    }) {
      typeof i == "string" || (0, e.devAssert)(
        !1,
        `Body must be a string. Received: ${(0, n.inspect)(i)}.`
      ), this.body = i, this.name = m, this.locationOffset = E, this.locationOffset.line > 0 || (0, e.devAssert)(
        !1,
        "line in locationOffset is 1-indexed and must be positive."
      ), this.locationOffset.column > 0 || (0, e.devAssert)(
        !1,
        "column in locationOffset is 1-indexed and must be positive."
      );
    }
    get [Symbol.toStringTag]() {
      return "Source";
    }
  }
  $.Source = r;
  function s(u) {
    return (0, c.instanceOf)(u, r);
  }
  return $;
}
var ae = {}, ce = {}, Le;
function Ft() {
  if (Le) return ce;
  Le = 1, Object.defineProperty(ce, "__esModule", {
    value: !0
  }), ce.invariant = e;
  function e(n, c) {
    if (!!!n)
      throw new Error(
        c ?? "Unexpected invariant triggered."
      );
  }
  return ce;
}
var Ce;
function _e() {
  if (Ce) return ae;
  Ce = 1, Object.defineProperty(ae, "__esModule", {
    value: !0
  }), ae.getLocation = c;
  var e = /* @__PURE__ */ Ft();
  const n = /\r\n|[\n\r]/g;
  function c(r, s) {
    let u = 0, i = 1;
    for (const m of r.body.matchAll(n)) {
      if (typeof m.index == "number" || (0, e.invariant)(!1), m.index >= s)
        break;
      u = m.index + m[0].length, i += 1;
    }
    return {
      line: i,
      column: s + 1 - u
    };
  }
  return ae;
}
var ee = {}, Ke;
function ot() {
  if (Ke) return ee;
  Ke = 1, Object.defineProperty(ee, "__esModule", {
    value: !0
  }), ee.printLocation = n, ee.printSourceLocation = c;
  var e = /* @__PURE__ */ _e();
  function n(s) {
    return c(
      s.source,
      (0, e.getLocation)(s.source, s.start)
    );
  }
  function c(s, u) {
    const i = s.locationOffset.column - 1, m = "".padStart(i) + s.body, E = u.line - 1, d = s.locationOffset.line - 1, y = u.line + d, t = u.line === 1 ? i : 0, l = u.column + t, N = `${s.name}:${y}:${l}
`, v = m.split(/\r\n|[\n\r]/g), o = v[E];
    if (o.length > 120) {
      const a = Math.floor(l / 80), h = l % 80, T = [];
      for (let g = 0; g < o.length; g += 80)
        T.push(o.slice(g, g + 80));
      return N + r([
        [`${y} |`, T[0]],
        ...T.slice(1, a + 1).map((g) => ["|", g]),
        ["|", "^".padStart(h)],
        ["|", T[a + 1]]
      ]);
    }
    return N + r([
      // Lines specified like this: ["prefix", "string"],
      [`${y - 1} |`, v[E - 1]],
      [`${y} |`, o],
      ["|", "^".padStart(l)],
      [`${y + 1} |`, v[E + 1]]
    ]);
  }
  function r(s) {
    const u = s.filter(([m, E]) => E !== void 0), i = Math.max(...u.map(([m]) => m.length));
    return u.map(([m, E]) => m.padStart(i) + (E ? " " + E : "")).join(`
`);
  }
  return ee;
}
var G = {}, Re;
function Te() {
  if (Re) return G;
  Re = 1, Object.defineProperty(G, "__esModule", {
    value: !0
  }), G.Kind = void 0;
  var e;
  return G.Kind = e, function(n) {
    n.NAME = "Name", n.DOCUMENT = "Document", n.OPERATION_DEFINITION = "OperationDefinition", n.VARIABLE_DEFINITION = "VariableDefinition", n.SELECTION_SET = "SelectionSet", n.FIELD = "Field", n.ARGUMENT = "Argument", n.FRAGMENT_SPREAD = "FragmentSpread", n.INLINE_FRAGMENT = "InlineFragment", n.FRAGMENT_DEFINITION = "FragmentDefinition", n.VARIABLE = "Variable", n.INT = "IntValue", n.FLOAT = "FloatValue", n.STRING = "StringValue", n.BOOLEAN = "BooleanValue", n.NULL = "NullValue", n.ENUM = "EnumValue", n.LIST = "ListValue", n.OBJECT = "ObjectValue", n.OBJECT_FIELD = "ObjectField", n.DIRECTIVE = "Directive", n.NAMED_TYPE = "NamedType", n.LIST_TYPE = "ListType", n.NON_NULL_TYPE = "NonNullType", n.SCHEMA_DEFINITION = "SchemaDefinition", n.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", n.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", n.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", n.FIELD_DEFINITION = "FieldDefinition", n.INPUT_VALUE_DEFINITION = "InputValueDefinition", n.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", n.UNION_TYPE_DEFINITION = "UnionTypeDefinition", n.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", n.ENUM_VALUE_DEFINITION = "EnumValueDefinition", n.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", n.DIRECTIVE_DEFINITION = "DirectiveDefinition", n.SCHEMA_EXTENSION = "SchemaExtension", n.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", n.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", n.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", n.UNION_TYPE_EXTENSION = "UnionTypeExtension", n.ENUM_TYPE_EXTENSION = "EnumTypeExtension", n.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
  }(e || (G.Kind = e = {})), G;
}
var q = {}, Fe;
function ge() {
  if (Fe) return q;
  Fe = 1, Object.defineProperty(q, "__esModule", {
    value: !0
  }), q.TokenKind = void 0;
  var e;
  return q.TokenKind = e, function(n) {
    n.SOF = "<SOF>", n.EOF = "<EOF>", n.BANG = "!", n.DOLLAR = "$", n.AMP = "&", n.PAREN_L = "(", n.PAREN_R = ")", n.SPREAD = "...", n.COLON = ":", n.EQUALS = "=", n.AT = "@", n.BRACKET_L = "[", n.BRACKET_R = "]", n.BRACE_L = "{", n.PIPE = "|", n.BRACE_R = "}", n.NAME = "Name", n.INT = "Int", n.FLOAT = "Float", n.STRING = "String", n.BLOCK_STRING = "BlockString", n.COMMENT = "Comment";
  }(e || (q.TokenKind = e = {})), q;
}
var Y = {}, ue = {}, B = {}, le = {}, Pe;
function Pt() {
  if (Pe) return le;
  Pe = 1, Object.defineProperty(le, "__esModule", {
    value: !0
  }), le.isObjectLike = e;
  function e(n) {
    return typeof n == "object" && n !== null;
  }
  return le;
}
var je;
function jt() {
  if (je) return B;
  je = 1, Object.defineProperty(B, "__esModule", {
    value: !0
  }), B.GraphQLError = void 0, B.formatError = m, B.printError = i;
  var e = /* @__PURE__ */ Pt(), n = /* @__PURE__ */ _e(), c = /* @__PURE__ */ ot();
  function r(E) {
    const d = E[0];
    return d == null || "kind" in d || "length" in d ? {
      nodes: d,
      source: E[1],
      positions: E[2],
      path: E[3],
      originalError: E[4],
      extensions: E[5]
    } : d;
  }
  let s = class at extends Error {
    /**
     * An array of `{ line, column }` locations within the source GraphQL document
     * which correspond to this error.
     *
     * Errors during validation often contain multiple locations, for example to
     * point out two things with the same name. Errors during execution include a
     * single location, the field which produced the error.
     *
     * Enumerable, and appears in the result of JSON.stringify().
     */
    /**
     * An array describing the JSON-path into the execution response which
     * corresponds to this error. Only included for errors during execution.
     *
     * Enumerable, and appears in the result of JSON.stringify().
     */
    /**
     * An array of GraphQL AST Nodes corresponding to this error.
     */
    /**
     * The source GraphQL document for the first location of this error.
     *
     * Note that if this Error represents more than one node, the source may not
     * represent nodes after the first node.
     */
    /**
     * An array of character offsets within the source GraphQL document
     * which correspond to this error.
     */
    /**
     * The original error thrown from a field resolver during execution.
     */
    /**
     * Extension fields to add to the formatted error.
     */
    /**
     * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
     */
    constructor(d, ...y) {
      var t, l, N;
      const { nodes: v, source: o, positions: a, path: h, originalError: T, extensions: g } = r(y);
      super(d), this.name = "GraphQLError", this.path = h ?? void 0, this.originalError = T ?? void 0, this.nodes = u(
        Array.isArray(v) ? v : v ? [v] : void 0
      );
      const x = u(
        (t = this.nodes) === null || t === void 0 ? void 0 : t.map((A) => A.loc).filter((A) => A != null)
      );
      this.source = o ?? (x == null || (l = x[0]) === null || l === void 0 ? void 0 : l.source), this.positions = a ?? (x == null ? void 0 : x.map((A) => A.start)), this.locations = a && o ? a.map((A) => (0, n.getLocation)(o, A)) : x == null ? void 0 : x.map(
        (A) => (0, n.getLocation)(A.source, A.start)
      );
      const b = (0, e.isObjectLike)(
        T == null ? void 0 : T.extensions
      ) ? T == null ? void 0 : T.extensions : void 0;
      this.extensions = (N = g ?? b) !== null && N !== void 0 ? N : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
        message: {
          writable: !0,
          enumerable: !0
        },
        name: {
          enumerable: !1
        },
        nodes: {
          enumerable: !1
        },
        source: {
          enumerable: !1
        },
        positions: {
          enumerable: !1
        },
        originalError: {
          enumerable: !1
        }
      }), T != null && T.stack ? Object.defineProperty(this, "stack", {
        value: T.stack,
        writable: !0,
        configurable: !0
      }) : Error.captureStackTrace ? Error.captureStackTrace(this, at) : Object.defineProperty(this, "stack", {
        value: Error().stack,
        writable: !0,
        configurable: !0
      });
    }
    get [Symbol.toStringTag]() {
      return "GraphQLError";
    }
    toString() {
      let d = this.message;
      if (this.nodes)
        for (const y of this.nodes)
          y.loc && (d += `

` + (0, c.printLocation)(y.loc));
      else if (this.source && this.locations)
        for (const y of this.locations)
          d += `

` + (0, c.printSourceLocation)(this.source, y);
      return d;
    }
    toJSON() {
      const d = {
        message: this.message
      };
      return this.locations != null && (d.locations = this.locations), this.path != null && (d.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (d.extensions = this.extensions), d;
    }
  };
  B.GraphQLError = s;
  function u(E) {
    return E === void 0 || E.length === 0 ? void 0 : E;
  }
  function i(E) {
    return E.toString();
  }
  function m(E) {
    return E.toJSON();
  }
  return B;
}
var we;
function ct() {
  if (we) return ue;
  we = 1, Object.defineProperty(ue, "__esModule", {
    value: !0
  }), ue.syntaxError = n;
  var e = /* @__PURE__ */ jt();
  function n(c, r, s) {
    return new e.GraphQLError(`Syntax Error: ${s}`, {
      source: c,
      positions: [r]
    });
  }
  return ue;
}
var C = {}, Me;
function Ee() {
  if (Me) return C;
  Me = 1, Object.defineProperty(C, "__esModule", {
    value: !0
  }), C.Token = C.QueryDocumentKeys = C.OperationTypeNode = C.Location = void 0, C.isNode = s;
  class e {
    /**
     * The character offset at which this Node begins.
     */
    /**
     * The character offset at which this Node ends.
     */
    /**
     * The Token at which this Node begins.
     */
    /**
     * The Token at which this Node ends.
     */
    /**
     * The Source document the AST represents.
     */
    constructor(m, E, d) {
      this.start = m.start, this.end = E.end, this.startToken = m, this.endToken = E, this.source = d;
    }
    get [Symbol.toStringTag]() {
      return "Location";
    }
    toJSON() {
      return {
        start: this.start,
        end: this.end
      };
    }
  }
  C.Location = e;
  class n {
    /**
     * The kind of Token.
     */
    /**
     * The character offset at which this Node begins.
     */
    /**
     * The character offset at which this Node ends.
     */
    /**
     * The 1-indexed line number on which this Token appears.
     */
    /**
     * The 1-indexed column number at which this Token begins.
     */
    /**
     * For non-punctuation tokens, represents the interpreted value of the token.
     *
     * Note: is undefined for punctuation tokens, but typed as string for
     * convenience in the parser.
     */
    /**
     * Tokens exist as nodes in a double-linked-list amongst all tokens
     * including ignored tokens. <SOF> is always the first node and <EOF>
     * the last.
     */
    constructor(m, E, d, y, t, l) {
      this.kind = m, this.start = E, this.end = d, this.line = y, this.column = t, this.value = l, this.prev = null, this.next = null;
    }
    get [Symbol.toStringTag]() {
      return "Token";
    }
    toJSON() {
      return {
        kind: this.kind,
        value: this.value,
        line: this.line,
        column: this.column
      };
    }
  }
  C.Token = n;
  const c = {
    Name: [],
    Document: ["definitions"],
    OperationDefinition: [
      "name",
      "variableDefinitions",
      "directives",
      "selectionSet"
    ],
    VariableDefinition: ["variable", "type", "defaultValue", "directives"],
    Variable: ["name"],
    SelectionSet: ["selections"],
    Field: ["alias", "name", "arguments", "directives", "selectionSet"],
    Argument: ["name", "value"],
    FragmentSpread: ["name", "directives"],
    InlineFragment: ["typeCondition", "directives", "selectionSet"],
    FragmentDefinition: [
      "name",
      // Note: fragment variable definitions are deprecated and will removed in v17.0.0
      "variableDefinitions",
      "typeCondition",
      "directives",
      "selectionSet"
    ],
    IntValue: [],
    FloatValue: [],
    StringValue: [],
    BooleanValue: [],
    NullValue: [],
    EnumValue: [],
    ListValue: ["values"],
    ObjectValue: ["fields"],
    ObjectField: ["name", "value"],
    Directive: ["name", "arguments"],
    NamedType: ["name"],
    ListType: ["type"],
    NonNullType: ["type"],
    SchemaDefinition: ["description", "directives", "operationTypes"],
    OperationTypeDefinition: ["type"],
    ScalarTypeDefinition: ["description", "name", "directives"],
    ObjectTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields"
    ],
    FieldDefinition: ["description", "name", "arguments", "type", "directives"],
    InputValueDefinition: [
      "description",
      "name",
      "type",
      "defaultValue",
      "directives"
    ],
    InterfaceTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields"
    ],
    UnionTypeDefinition: ["description", "name", "directives", "types"],
    EnumTypeDefinition: ["description", "name", "directives", "values"],
    EnumValueDefinition: ["description", "name", "directives"],
    InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
    DirectiveDefinition: ["description", "name", "arguments", "locations"],
    SchemaExtension: ["directives", "operationTypes"],
    ScalarTypeExtension: ["name", "directives"],
    ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
    InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
    UnionTypeExtension: ["name", "directives", "types"],
    EnumTypeExtension: ["name", "directives", "values"],
    InputObjectTypeExtension: ["name", "directives", "fields"]
  };
  C.QueryDocumentKeys = c;
  const r = new Set(Object.keys(c));
  function s(i) {
    const m = i == null ? void 0 : i.kind;
    return typeof m == "string" && r.has(m);
  }
  var u;
  return C.OperationTypeNode = u, function(i) {
    i.QUERY = "query", i.MUTATION = "mutation", i.SUBSCRIPTION = "subscription";
  }(u || (C.OperationTypeNode = u = {})), C;
}
var Q = {}, j = {}, Ve;
function ut() {
  if (Ve) return j;
  Ve = 1, Object.defineProperty(j, "__esModule", {
    value: !0
  }), j.isDigit = n, j.isLetter = c, j.isNameContinue = s, j.isNameStart = r, j.isWhiteSpace = e;
  function e(u) {
    return u === 9 || u === 32;
  }
  function n(u) {
    return u >= 48 && u <= 57;
  }
  function c(u) {
    return u >= 97 && u <= 122 || // A-Z
    u >= 65 && u <= 90;
  }
  function r(u) {
    return c(u) || u === 95;
  }
  function s(u) {
    return c(u) || n(u) || u === 95;
  }
  return j;
}
var Be;
function lt() {
  if (Be) return Q;
  Be = 1, Object.defineProperty(Q, "__esModule", {
    value: !0
  }), Q.dedentBlockStringLines = n, Q.isPrintableAsBlockString = r, Q.printBlockString = s;
  var e = /* @__PURE__ */ ut();
  function n(u) {
    var i;
    let m = Number.MAX_SAFE_INTEGER, E = null, d = -1;
    for (let t = 0; t < u.length; ++t) {
      var y;
      const l = u[t], N = c(l);
      N !== l.length && (E = (y = E) !== null && y !== void 0 ? y : t, d = t, t !== 0 && N < m && (m = N));
    }
    return u.map((t, l) => l === 0 ? t : t.slice(m)).slice(
      (i = E) !== null && i !== void 0 ? i : 0,
      d + 1
    );
  }
  function c(u) {
    let i = 0;
    for (; i < u.length && (0, e.isWhiteSpace)(u.charCodeAt(i)); )
      ++i;
    return i;
  }
  function r(u) {
    if (u === "")
      return !0;
    let i = !0, m = !1, E = !0, d = !1;
    for (let y = 0; y < u.length; ++y)
      switch (u.codePointAt(y)) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 11:
        case 12:
        case 14:
        case 15:
          return !1;
        // Has non-printable characters
        case 13:
          return !1;
        // Has \r or \r\n which will be replaced as \n
        case 10:
          if (i && !d)
            return !1;
          d = !0, i = !0, m = !1;
          break;
        case 9:
        //   \t
        case 32:
          m || (m = i);
          break;
        default:
          E && (E = m), i = !1;
      }
    return !(i || E && d);
  }
  function s(u, i) {
    const m = u.replace(/"""/g, '\\"""'), E = m.split(/\r\n|[\n\r]/g), d = E.length === 1, y = E.length > 1 && E.slice(1).every(
      (T) => T.length === 0 || (0, e.isWhiteSpace)(T.charCodeAt(0))
    ), t = m.endsWith('\\"""'), l = u.endsWith('"') && !t, N = u.endsWith("\\"), v = l || N, o = !(i != null && i.minimize) && // add leading and trailing new lines only if it improves readability
    (!d || u.length > 70 || v || y || t);
    let a = "";
    const h = d && (0, e.isWhiteSpace)(u.charCodeAt(0));
    return (o && !h || y) && (a += `
`), a += m, (o || v) && (a += `
`), '"""' + a + '"""';
  }
  return Q;
}
var Ue;
function dt() {
  if (Ue) return Y;
  Ue = 1, Object.defineProperty(Y, "__esModule", {
    value: !0
  }), Y.Lexer = void 0, Y.isPunctuatorTokenKind = i;
  var e = /* @__PURE__ */ ct(), n = /* @__PURE__ */ Ee(), c = /* @__PURE__ */ lt(), r = /* @__PURE__ */ ut(), s = /* @__PURE__ */ ge();
  class u {
    /**
     * The previously focused non-ignored token.
     */
    /**
     * The currently focused non-ignored token.
     */
    /**
     * The (1-indexed) line containing the current token.
     */
    /**
     * The character offset at which the current line begins.
     */
    constructor(O) {
      const _ = new n.Token(
        s.TokenKind.SOF,
        0,
        0,
        0,
        0
      );
      this.source = O, this.lastToken = _, this.token = _, this.line = 1, this.lineStart = 0;
    }
    get [Symbol.toStringTag]() {
      return "Lexer";
    }
    /**
     * Advances the token stream to the next non-ignored token.
     */
    advance() {
      return this.lastToken = this.token, this.token = this.lookahead();
    }
    /**
     * Looks ahead and returns the next non-ignored token, but does not change
     * the state of Lexer.
     */
    lookahead() {
      let O = this.token;
      if (O.kind !== s.TokenKind.EOF)
        do
          if (O.next)
            O = O.next;
          else {
            const _ = N(this, O.end);
            O.next = _, _.prev = O, O = _;
          }
        while (O.kind === s.TokenKind.COMMENT);
      return O;
    }
  }
  Y.Lexer = u;
  function i(f) {
    return f === s.TokenKind.BANG || f === s.TokenKind.DOLLAR || f === s.TokenKind.AMP || f === s.TokenKind.PAREN_L || f === s.TokenKind.PAREN_R || f === s.TokenKind.SPREAD || f === s.TokenKind.COLON || f === s.TokenKind.EQUALS || f === s.TokenKind.AT || f === s.TokenKind.BRACKET_L || f === s.TokenKind.BRACKET_R || f === s.TokenKind.BRACE_L || f === s.TokenKind.PIPE || f === s.TokenKind.BRACE_R;
  }
  function m(f) {
    return f >= 0 && f <= 55295 || f >= 57344 && f <= 1114111;
  }
  function E(f, O) {
    return d(f.charCodeAt(O)) && y(f.charCodeAt(O + 1));
  }
  function d(f) {
    return f >= 55296 && f <= 56319;
  }
  function y(f) {
    return f >= 56320 && f <= 57343;
  }
  function t(f, O) {
    const _ = f.source.body.codePointAt(O);
    if (_ === void 0)
      return s.TokenKind.EOF;
    if (_ >= 32 && _ <= 126) {
      const k = String.fromCodePoint(_);
      return k === '"' ? `'"'` : `"${k}"`;
    }
    return "U+" + _.toString(16).toUpperCase().padStart(4, "0");
  }
  function l(f, O, _, k, p) {
    const I = f.line, S = 1 + _ - f.lineStart;
    return new n.Token(O, _, k, I, S, p);
  }
  function N(f, O) {
    const _ = f.source.body, k = _.length;
    let p = O;
    for (; p < k; ) {
      const I = _.charCodeAt(p);
      switch (I) {
        // Ignored ::
        //   - UnicodeBOM
        //   - WhiteSpace
        //   - LineTerminator
        //   - Comment
        //   - Comma
        //
        // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
        //
        // WhiteSpace ::
        //   - "Horizontal Tab (U+0009)"
        //   - "Space (U+0020)"
        //
        // Comma :: ,
        case 65279:
        // <BOM>
        case 9:
        // \t
        case 32:
        // <space>
        case 44:
          ++p;
          continue;
        // LineTerminator ::
        //   - "New Line (U+000A)"
        //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
        //   - "Carriage Return (U+000D)" "New Line (U+000A)"
        case 10:
          ++p, ++f.line, f.lineStart = p;
          continue;
        case 13:
          _.charCodeAt(p + 1) === 10 ? p += 2 : ++p, ++f.line, f.lineStart = p;
          continue;
        // Comment
        case 35:
          return v(f, p);
        // Token ::
        //   - Punctuator
        //   - Name
        //   - IntValue
        //   - FloatValue
        //   - StringValue
        //
        // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }
        case 33:
          return l(
            f,
            s.TokenKind.BANG,
            p,
            p + 1
          );
        case 36:
          return l(
            f,
            s.TokenKind.DOLLAR,
            p,
            p + 1
          );
        case 38:
          return l(
            f,
            s.TokenKind.AMP,
            p,
            p + 1
          );
        case 40:
          return l(
            f,
            s.TokenKind.PAREN_L,
            p,
            p + 1
          );
        case 41:
          return l(
            f,
            s.TokenKind.PAREN_R,
            p,
            p + 1
          );
        case 46:
          if (_.charCodeAt(p + 1) === 46 && _.charCodeAt(p + 2) === 46)
            return l(
              f,
              s.TokenKind.SPREAD,
              p,
              p + 3
            );
          break;
        case 58:
          return l(
            f,
            s.TokenKind.COLON,
            p,
            p + 1
          );
        case 61:
          return l(
            f,
            s.TokenKind.EQUALS,
            p,
            p + 1
          );
        case 64:
          return l(
            f,
            s.TokenKind.AT,
            p,
            p + 1
          );
        case 91:
          return l(
            f,
            s.TokenKind.BRACKET_L,
            p,
            p + 1
          );
        case 93:
          return l(
            f,
            s.TokenKind.BRACKET_R,
            p,
            p + 1
          );
        case 123:
          return l(
            f,
            s.TokenKind.BRACE_L,
            p,
            p + 1
          );
        case 124:
          return l(
            f,
            s.TokenKind.PIPE,
            p,
            p + 1
          );
        case 125:
          return l(
            f,
            s.TokenKind.BRACE_R,
            p,
            p + 1
          );
        // StringValue
        case 34:
          return _.charCodeAt(p + 1) === 34 && _.charCodeAt(p + 2) === 34 ? H(f, p) : h(f, p);
      }
      if ((0, r.isDigit)(I) || I === 45)
        return o(f, p, I);
      if ((0, r.isNameStart)(I))
        return W(f, p);
      throw (0, e.syntaxError)(
        f.source,
        p,
        I === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : m(I) || E(_, p) ? `Unexpected character: ${t(f, p)}.` : `Invalid character: ${t(f, p)}.`
      );
    }
    return l(f, s.TokenKind.EOF, k, k);
  }
  function v(f, O) {
    const _ = f.source.body, k = _.length;
    let p = O + 1;
    for (; p < k; ) {
      const I = _.charCodeAt(p);
      if (I === 10 || I === 13)
        break;
      if (m(I))
        ++p;
      else if (E(_, p))
        p += 2;
      else
        break;
    }
    return l(
      f,
      s.TokenKind.COMMENT,
      O,
      p,
      _.slice(O + 1, p)
    );
  }
  function o(f, O, _) {
    const k = f.source.body;
    let p = O, I = _, S = !1;
    if (I === 45 && (I = k.charCodeAt(++p)), I === 48) {
      if (I = k.charCodeAt(++p), (0, r.isDigit)(I))
        throw (0, e.syntaxError)(
          f.source,
          p,
          `Invalid number, unexpected digit after 0: ${t(
            f,
            p
          )}.`
        );
    } else
      p = a(f, p, I), I = k.charCodeAt(p);
    if (I === 46 && (S = !0, I = k.charCodeAt(++p), p = a(f, p, I), I = k.charCodeAt(p)), (I === 69 || I === 101) && (S = !0, I = k.charCodeAt(++p), (I === 43 || I === 45) && (I = k.charCodeAt(++p)), p = a(f, p, I), I = k.charCodeAt(p)), I === 46 || (0, r.isNameStart)(I))
      throw (0, e.syntaxError)(
        f.source,
        p,
        `Invalid number, expected digit but got: ${t(
          f,
          p
        )}.`
      );
    return l(
      f,
      S ? s.TokenKind.FLOAT : s.TokenKind.INT,
      O,
      p,
      k.slice(O, p)
    );
  }
  function a(f, O, _) {
    if (!(0, r.isDigit)(_))
      throw (0, e.syntaxError)(
        f.source,
        O,
        `Invalid number, expected digit but got: ${t(
          f,
          O
        )}.`
      );
    const k = f.source.body;
    let p = O + 1;
    for (; (0, r.isDigit)(k.charCodeAt(p)); )
      ++p;
    return p;
  }
  function h(f, O) {
    const _ = f.source.body, k = _.length;
    let p = O + 1, I = p, S = "";
    for (; p < k; ) {
      const D = _.charCodeAt(p);
      if (D === 34)
        return S += _.slice(I, p), l(
          f,
          s.TokenKind.STRING,
          O,
          p + 1,
          S
        );
      if (D === 92) {
        S += _.slice(I, p);
        const V = _.charCodeAt(p + 1) === 117 ? _.charCodeAt(p + 2) === 123 ? T(f, p) : g(f, p) : A(f, p);
        S += V.value, p += V.size, I = p;
        continue;
      }
      if (D === 10 || D === 13)
        break;
      if (m(D))
        ++p;
      else if (E(_, p))
        p += 2;
      else
        throw (0, e.syntaxError)(
          f.source,
          p,
          `Invalid character within String: ${t(
            f,
            p
          )}.`
        );
    }
    throw (0, e.syntaxError)(
      f.source,
      p,
      "Unterminated string."
    );
  }
  function T(f, O) {
    const _ = f.source.body;
    let k = 0, p = 3;
    for (; p < 12; ) {
      const I = _.charCodeAt(O + p++);
      if (I === 125) {
        if (p < 5 || !m(k))
          break;
        return {
          value: String.fromCodePoint(k),
          size: p
        };
      }
      if (k = k << 4 | b(I), k < 0)
        break;
    }
    throw (0, e.syntaxError)(
      f.source,
      O,
      `Invalid Unicode escape sequence: "${_.slice(
        O,
        O + p
      )}".`
    );
  }
  function g(f, O) {
    const _ = f.source.body, k = x(_, O + 2);
    if (m(k))
      return {
        value: String.fromCodePoint(k),
        size: 6
      };
    if (d(k) && _.charCodeAt(O + 6) === 92 && _.charCodeAt(O + 7) === 117) {
      const p = x(_, O + 8);
      if (y(p))
        return {
          value: String.fromCodePoint(k, p),
          size: 12
        };
    }
    throw (0, e.syntaxError)(
      f.source,
      O,
      `Invalid Unicode escape sequence: "${_.slice(O, O + 6)}".`
    );
  }
  function x(f, O) {
    return b(f.charCodeAt(O)) << 12 | b(f.charCodeAt(O + 1)) << 8 | b(f.charCodeAt(O + 2)) << 4 | b(f.charCodeAt(O + 3));
  }
  function b(f) {
    return f >= 48 && f <= 57 ? f - 48 : f >= 65 && f <= 70 ? f - 55 : f >= 97 && f <= 102 ? f - 87 : -1;
  }
  function A(f, O) {
    const _ = f.source.body;
    switch (_.charCodeAt(O + 1)) {
      case 34:
        return {
          value: '"',
          size: 2
        };
      case 92:
        return {
          value: "\\",
          size: 2
        };
      case 47:
        return {
          value: "/",
          size: 2
        };
      case 98:
        return {
          value: "\b",
          size: 2
        };
      case 102:
        return {
          value: "\f",
          size: 2
        };
      case 110:
        return {
          value: `
`,
          size: 2
        };
      case 114:
        return {
          value: "\r",
          size: 2
        };
      case 116:
        return {
          value: "	",
          size: 2
        };
    }
    throw (0, e.syntaxError)(
      f.source,
      O,
      `Invalid character escape sequence: "${_.slice(
        O,
        O + 2
      )}".`
    );
  }
  function H(f, O) {
    const _ = f.source.body, k = _.length;
    let p = f.lineStart, I = O + 3, S = I, D = "";
    const V = [];
    for (; I < k; ) {
      const U = _.charCodeAt(I);
      if (U === 34 && _.charCodeAt(I + 1) === 34 && _.charCodeAt(I + 2) === 34) {
        D += _.slice(S, I), V.push(D);
        const gt = l(
          f,
          s.TokenKind.BLOCK_STRING,
          O,
          I + 3,
          // Return a string of the lines joined with U+000A.
          (0, c.dedentBlockStringLines)(V).join(`
`)
        );
        return f.line += V.length - 1, f.lineStart = p, gt;
      }
      if (U === 92 && _.charCodeAt(I + 1) === 34 && _.charCodeAt(I + 2) === 34 && _.charCodeAt(I + 3) === 34) {
        D += _.slice(S, I), S = I + 1, I += 4;
        continue;
      }
      if (U === 10 || U === 13) {
        D += _.slice(S, I), V.push(D), U === 13 && _.charCodeAt(I + 1) === 10 ? I += 2 : ++I, D = "", S = I, p = I;
        continue;
      }
      if (m(U))
        ++I;
      else if (E(_, I))
        I += 2;
      else
        throw (0, e.syntaxError)(
          f.source,
          I,
          `Invalid character within String: ${t(
            f,
            I
          )}.`
        );
    }
    throw (0, e.syntaxError)(
      f.source,
      I,
      "Unterminated string."
    );
  }
  function W(f, O) {
    const _ = f.source.body, k = _.length;
    let p = O + 1;
    for (; p < k; ) {
      const I = _.charCodeAt(p);
      if ((0, r.isNameContinue)(I))
        ++p;
      else
        break;
    }
    return l(
      f,
      s.TokenKind.NAME,
      O,
      p,
      _.slice(O, p)
    );
  }
  return Y;
}
var R = {}, J = {}, $e;
function pt() {
  if ($e) return J;
  $e = 1, Object.defineProperty(J, "__esModule", {
    value: !0
  }), J.DirectiveLocation = void 0;
  var e;
  return J.DirectiveLocation = e, function(n) {
    n.QUERY = "QUERY", n.MUTATION = "MUTATION", n.SUBSCRIPTION = "SUBSCRIPTION", n.FIELD = "FIELD", n.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", n.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", n.INLINE_FRAGMENT = "INLINE_FRAGMENT", n.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", n.SCHEMA = "SCHEMA", n.SCALAR = "SCALAR", n.OBJECT = "OBJECT", n.FIELD_DEFINITION = "FIELD_DEFINITION", n.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", n.INTERFACE = "INTERFACE", n.UNION = "UNION", n.ENUM = "ENUM", n.ENUM_VALUE = "ENUM_VALUE", n.INPUT_OBJECT = "INPUT_OBJECT", n.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
  }(e || (J.DirectiveLocation = e = {})), J;
}
var Ge;
function wt() {
  if (Ge) return R;
  Ge = 1, Object.defineProperty(R, "__esModule", {
    value: !0
  }), R.Parser = void 0, R.parse = m, R.parseConstValue = d, R.parseType = y, R.parseValue = E;
  var e = /* @__PURE__ */ ct(), n = /* @__PURE__ */ Ee(), c = /* @__PURE__ */ pt(), r = /* @__PURE__ */ Te(), s = /* @__PURE__ */ dt(), u = /* @__PURE__ */ st(), i = /* @__PURE__ */ ge();
  function m(v, o) {
    const a = new t(v, o), h = a.parseDocument();
    return Object.defineProperty(h, "tokenCount", {
      enumerable: !1,
      value: a.tokenCount
    }), h;
  }
  function E(v, o) {
    const a = new t(v, o);
    a.expectToken(i.TokenKind.SOF);
    const h = a.parseValueLiteral(!1);
    return a.expectToken(i.TokenKind.EOF), h;
  }
  function d(v, o) {
    const a = new t(v, o);
    a.expectToken(i.TokenKind.SOF);
    const h = a.parseConstValueLiteral();
    return a.expectToken(i.TokenKind.EOF), h;
  }
  function y(v, o) {
    const a = new t(v, o);
    a.expectToken(i.TokenKind.SOF);
    const h = a.parseTypeReference();
    return a.expectToken(i.TokenKind.EOF), h;
  }
  class t {
    constructor(o, a = {}) {
      const h = (0, u.isSource)(o) ? o : new u.Source(o);
      this._lexer = new s.Lexer(h), this._options = a, this._tokenCounter = 0;
    }
    get tokenCount() {
      return this._tokenCounter;
    }
    /**
     * Converts a name lex token into a name parse node.
     */
    parseName() {
      const o = this.expectToken(i.TokenKind.NAME);
      return this.node(o, {
        kind: r.Kind.NAME,
        value: o.value
      });
    }
    // Implements the parsing rules in the Document section.
    /**
     * Document : Definition+
     */
    parseDocument() {
      return this.node(this._lexer.token, {
        kind: r.Kind.DOCUMENT,
        definitions: this.many(
          i.TokenKind.SOF,
          this.parseDefinition,
          i.TokenKind.EOF
        )
      });
    }
    /**
     * Definition :
     *   - ExecutableDefinition
     *   - TypeSystemDefinition
     *   - TypeSystemExtension
     *
     * ExecutableDefinition :
     *   - OperationDefinition
     *   - FragmentDefinition
     *
     * TypeSystemDefinition :
     *   - SchemaDefinition
     *   - TypeDefinition
     *   - DirectiveDefinition
     *
     * TypeDefinition :
     *   - ScalarTypeDefinition
     *   - ObjectTypeDefinition
     *   - InterfaceTypeDefinition
     *   - UnionTypeDefinition
     *   - EnumTypeDefinition
     *   - InputObjectTypeDefinition
     */
    parseDefinition() {
      if (this.peek(i.TokenKind.BRACE_L))
        return this.parseOperationDefinition();
      const o = this.peekDescription(), a = o ? this._lexer.lookahead() : this._lexer.token;
      if (a.kind === i.TokenKind.NAME) {
        switch (a.value) {
          case "schema":
            return this.parseSchemaDefinition();
          case "scalar":
            return this.parseScalarTypeDefinition();
          case "type":
            return this.parseObjectTypeDefinition();
          case "interface":
            return this.parseInterfaceTypeDefinition();
          case "union":
            return this.parseUnionTypeDefinition();
          case "enum":
            return this.parseEnumTypeDefinition();
          case "input":
            return this.parseInputObjectTypeDefinition();
          case "directive":
            return this.parseDirectiveDefinition();
        }
        if (o)
          throw (0, e.syntaxError)(
            this._lexer.source,
            this._lexer.token.start,
            "Unexpected description, descriptions are supported only on type definitions."
          );
        switch (a.value) {
          case "query":
          case "mutation":
          case "subscription":
            return this.parseOperationDefinition();
          case "fragment":
            return this.parseFragmentDefinition();
          case "extend":
            return this.parseTypeSystemExtension();
        }
      }
      throw this.unexpected(a);
    }
    // Implements the parsing rules in the Operations section.
    /**
     * OperationDefinition :
     *  - SelectionSet
     *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
     */
    parseOperationDefinition() {
      const o = this._lexer.token;
      if (this.peek(i.TokenKind.BRACE_L))
        return this.node(o, {
          kind: r.Kind.OPERATION_DEFINITION,
          operation: n.OperationTypeNode.QUERY,
          name: void 0,
          variableDefinitions: [],
          directives: [],
          selectionSet: this.parseSelectionSet()
        });
      const a = this.parseOperationType();
      let h;
      return this.peek(i.TokenKind.NAME) && (h = this.parseName()), this.node(o, {
        kind: r.Kind.OPERATION_DEFINITION,
        operation: a,
        name: h,
        variableDefinitions: this.parseVariableDefinitions(),
        directives: this.parseDirectives(!1),
        selectionSet: this.parseSelectionSet()
      });
    }
    /**
     * OperationType : one of query mutation subscription
     */
    parseOperationType() {
      const o = this.expectToken(i.TokenKind.NAME);
      switch (o.value) {
        case "query":
          return n.OperationTypeNode.QUERY;
        case "mutation":
          return n.OperationTypeNode.MUTATION;
        case "subscription":
          return n.OperationTypeNode.SUBSCRIPTION;
      }
      throw this.unexpected(o);
    }
    /**
     * VariableDefinitions : ( VariableDefinition+ )
     */
    parseVariableDefinitions() {
      return this.optionalMany(
        i.TokenKind.PAREN_L,
        this.parseVariableDefinition,
        i.TokenKind.PAREN_R
      );
    }
    /**
     * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
     */
    parseVariableDefinition() {
      return this.node(this._lexer.token, {
        kind: r.Kind.VARIABLE_DEFINITION,
        variable: this.parseVariable(),
        type: (this.expectToken(i.TokenKind.COLON), this.parseTypeReference()),
        defaultValue: this.expectOptionalToken(i.TokenKind.EQUALS) ? this.parseConstValueLiteral() : void 0,
        directives: this.parseConstDirectives()
      });
    }
    /**
     * Variable : $ Name
     */
    parseVariable() {
      const o = this._lexer.token;
      return this.expectToken(i.TokenKind.DOLLAR), this.node(o, {
        kind: r.Kind.VARIABLE,
        name: this.parseName()
      });
    }
    /**
     * ```
     * SelectionSet : { Selection+ }
     * ```
     */
    parseSelectionSet() {
      return this.node(this._lexer.token, {
        kind: r.Kind.SELECTION_SET,
        selections: this.many(
          i.TokenKind.BRACE_L,
          this.parseSelection,
          i.TokenKind.BRACE_R
        )
      });
    }
    /**
     * Selection :
     *   - Field
     *   - FragmentSpread
     *   - InlineFragment
     */
    parseSelection() {
      return this.peek(i.TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
    }
    /**
     * Field : Alias? Name Arguments? Directives? SelectionSet?
     *
     * Alias : Name :
     */
    parseField() {
      const o = this._lexer.token, a = this.parseName();
      let h, T;
      return this.expectOptionalToken(i.TokenKind.COLON) ? (h = a, T = this.parseName()) : T = a, this.node(o, {
        kind: r.Kind.FIELD,
        alias: h,
        name: T,
        arguments: this.parseArguments(!1),
        directives: this.parseDirectives(!1),
        selectionSet: this.peek(i.TokenKind.BRACE_L) ? this.parseSelectionSet() : void 0
      });
    }
    /**
     * Arguments[Const] : ( Argument[?Const]+ )
     */
    parseArguments(o) {
      const a = o ? this.parseConstArgument : this.parseArgument;
      return this.optionalMany(
        i.TokenKind.PAREN_L,
        a,
        i.TokenKind.PAREN_R
      );
    }
    /**
     * Argument[Const] : Name : Value[?Const]
     */
    parseArgument(o = !1) {
      const a = this._lexer.token, h = this.parseName();
      return this.expectToken(i.TokenKind.COLON), this.node(a, {
        kind: r.Kind.ARGUMENT,
        name: h,
        value: this.parseValueLiteral(o)
      });
    }
    parseConstArgument() {
      return this.parseArgument(!0);
    }
    // Implements the parsing rules in the Fragments section.
    /**
     * Corresponds to both FragmentSpread and InlineFragment in the spec.
     *
     * FragmentSpread : ... FragmentName Directives?
     *
     * InlineFragment : ... TypeCondition? Directives? SelectionSet
     */
    parseFragment() {
      const o = this._lexer.token;
      this.expectToken(i.TokenKind.SPREAD);
      const a = this.expectOptionalKeyword("on");
      return !a && this.peek(i.TokenKind.NAME) ? this.node(o, {
        kind: r.Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(!1)
      }) : this.node(o, {
        kind: r.Kind.INLINE_FRAGMENT,
        typeCondition: a ? this.parseNamedType() : void 0,
        directives: this.parseDirectives(!1),
        selectionSet: this.parseSelectionSet()
      });
    }
    /**
     * FragmentDefinition :
     *   - fragment FragmentName on TypeCondition Directives? SelectionSet
     *
     * TypeCondition : NamedType
     */
    parseFragmentDefinition() {
      const o = this._lexer.token;
      return this.expectKeyword("fragment"), this._options.allowLegacyFragmentVariables === !0 ? this.node(o, {
        kind: r.Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
        directives: this.parseDirectives(!1),
        selectionSet: this.parseSelectionSet()
      }) : this.node(o, {
        kind: r.Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
        directives: this.parseDirectives(!1),
        selectionSet: this.parseSelectionSet()
      });
    }
    /**
     * FragmentName : Name but not `on`
     */
    parseFragmentName() {
      if (this._lexer.token.value === "on")
        throw this.unexpected();
      return this.parseName();
    }
    // Implements the parsing rules in the Values section.
    /**
     * Value[Const] :
     *   - [~Const] Variable
     *   - IntValue
     *   - FloatValue
     *   - StringValue
     *   - BooleanValue
     *   - NullValue
     *   - EnumValue
     *   - ListValue[?Const]
     *   - ObjectValue[?Const]
     *
     * BooleanValue : one of `true` `false`
     *
     * NullValue : `null`
     *
     * EnumValue : Name but not `true`, `false` or `null`
     */
    parseValueLiteral(o) {
      const a = this._lexer.token;
      switch (a.kind) {
        case i.TokenKind.BRACKET_L:
          return this.parseList(o);
        case i.TokenKind.BRACE_L:
          return this.parseObject(o);
        case i.TokenKind.INT:
          return this.advanceLexer(), this.node(a, {
            kind: r.Kind.INT,
            value: a.value
          });
        case i.TokenKind.FLOAT:
          return this.advanceLexer(), this.node(a, {
            kind: r.Kind.FLOAT,
            value: a.value
          });
        case i.TokenKind.STRING:
        case i.TokenKind.BLOCK_STRING:
          return this.parseStringLiteral();
        case i.TokenKind.NAME:
          switch (this.advanceLexer(), a.value) {
            case "true":
              return this.node(a, {
                kind: r.Kind.BOOLEAN,
                value: !0
              });
            case "false":
              return this.node(a, {
                kind: r.Kind.BOOLEAN,
                value: !1
              });
            case "null":
              return this.node(a, {
                kind: r.Kind.NULL
              });
            default:
              return this.node(a, {
                kind: r.Kind.ENUM,
                value: a.value
              });
          }
        case i.TokenKind.DOLLAR:
          if (o)
            if (this.expectToken(i.TokenKind.DOLLAR), this._lexer.token.kind === i.TokenKind.NAME) {
              const h = this._lexer.token.value;
              throw (0, e.syntaxError)(
                this._lexer.source,
                a.start,
                `Unexpected variable "$${h}" in constant value.`
              );
            } else
              throw this.unexpected(a);
          return this.parseVariable();
        default:
          throw this.unexpected();
      }
    }
    parseConstValueLiteral() {
      return this.parseValueLiteral(!0);
    }
    parseStringLiteral() {
      const o = this._lexer.token;
      return this.advanceLexer(), this.node(o, {
        kind: r.Kind.STRING,
        value: o.value,
        block: o.kind === i.TokenKind.BLOCK_STRING
      });
    }
    /**
     * ListValue[Const] :
     *   - [ ]
     *   - [ Value[?Const]+ ]
     */
    parseList(o) {
      const a = () => this.parseValueLiteral(o);
      return this.node(this._lexer.token, {
        kind: r.Kind.LIST,
        values: this.any(
          i.TokenKind.BRACKET_L,
          a,
          i.TokenKind.BRACKET_R
        )
      });
    }
    /**
     * ```
     * ObjectValue[Const] :
     *   - { }
     *   - { ObjectField[?Const]+ }
     * ```
     */
    parseObject(o) {
      const a = () => this.parseObjectField(o);
      return this.node(this._lexer.token, {
        kind: r.Kind.OBJECT,
        fields: this.any(
          i.TokenKind.BRACE_L,
          a,
          i.TokenKind.BRACE_R
        )
      });
    }
    /**
     * ObjectField[Const] : Name : Value[?Const]
     */
    parseObjectField(o) {
      const a = this._lexer.token, h = this.parseName();
      return this.expectToken(i.TokenKind.COLON), this.node(a, {
        kind: r.Kind.OBJECT_FIELD,
        name: h,
        value: this.parseValueLiteral(o)
      });
    }
    // Implements the parsing rules in the Directives section.
    /**
     * Directives[Const] : Directive[?Const]+
     */
    parseDirectives(o) {
      const a = [];
      for (; this.peek(i.TokenKind.AT); )
        a.push(this.parseDirective(o));
      return a;
    }
    parseConstDirectives() {
      return this.parseDirectives(!0);
    }
    /**
     * ```
     * Directive[Const] : @ Name Arguments[?Const]?
     * ```
     */
    parseDirective(o) {
      const a = this._lexer.token;
      return this.expectToken(i.TokenKind.AT), this.node(a, {
        kind: r.Kind.DIRECTIVE,
        name: this.parseName(),
        arguments: this.parseArguments(o)
      });
    }
    // Implements the parsing rules in the Types section.
    /**
     * Type :
     *   - NamedType
     *   - ListType
     *   - NonNullType
     */
    parseTypeReference() {
      const o = this._lexer.token;
      let a;
      if (this.expectOptionalToken(i.TokenKind.BRACKET_L)) {
        const h = this.parseTypeReference();
        this.expectToken(i.TokenKind.BRACKET_R), a = this.node(o, {
          kind: r.Kind.LIST_TYPE,
          type: h
        });
      } else
        a = this.parseNamedType();
      return this.expectOptionalToken(i.TokenKind.BANG) ? this.node(o, {
        kind: r.Kind.NON_NULL_TYPE,
        type: a
      }) : a;
    }
    /**
     * NamedType : Name
     */
    parseNamedType() {
      return this.node(this._lexer.token, {
        kind: r.Kind.NAMED_TYPE,
        name: this.parseName()
      });
    }
    // Implements the parsing rules in the Type Definition section.
    peekDescription() {
      return this.peek(i.TokenKind.STRING) || this.peek(i.TokenKind.BLOCK_STRING);
    }
    /**
     * Description : StringValue
     */
    parseDescription() {
      if (this.peekDescription())
        return this.parseStringLiteral();
    }
    /**
     * ```
     * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
     * ```
     */
    parseSchemaDefinition() {
      const o = this._lexer.token, a = this.parseDescription();
      this.expectKeyword("schema");
      const h = this.parseConstDirectives(), T = this.many(
        i.TokenKind.BRACE_L,
        this.parseOperationTypeDefinition,
        i.TokenKind.BRACE_R
      );
      return this.node(o, {
        kind: r.Kind.SCHEMA_DEFINITION,
        description: a,
        directives: h,
        operationTypes: T
      });
    }
    /**
     * OperationTypeDefinition : OperationType : NamedType
     */
    parseOperationTypeDefinition() {
      const o = this._lexer.token, a = this.parseOperationType();
      this.expectToken(i.TokenKind.COLON);
      const h = this.parseNamedType();
      return this.node(o, {
        kind: r.Kind.OPERATION_TYPE_DEFINITION,
        operation: a,
        type: h
      });
    }
    /**
     * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
     */
    parseScalarTypeDefinition() {
      const o = this._lexer.token, a = this.parseDescription();
      this.expectKeyword("scalar");
      const h = this.parseName(), T = this.parseConstDirectives();
      return this.node(o, {
        kind: r.Kind.SCALAR_TYPE_DEFINITION,
        description: a,
        name: h,
        directives: T
      });
    }
    /**
     * ObjectTypeDefinition :
     *   Description?
     *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
     */
    parseObjectTypeDefinition() {
      const o = this._lexer.token, a = this.parseDescription();
      this.expectKeyword("type");
      const h = this.parseName(), T = this.parseImplementsInterfaces(), g = this.parseConstDirectives(), x = this.parseFieldsDefinition();
      return this.node(o, {
        kind: r.Kind.OBJECT_TYPE_DEFINITION,
        description: a,
        name: h,
        interfaces: T,
        directives: g,
        fields: x
      });
    }
    /**
     * ImplementsInterfaces :
     *   - implements `&`? NamedType
     *   - ImplementsInterfaces & NamedType
     */
    parseImplementsInterfaces() {
      return this.expectOptionalKeyword("implements") ? this.delimitedMany(i.TokenKind.AMP, this.parseNamedType) : [];
    }
    /**
     * ```
     * FieldsDefinition : { FieldDefinition+ }
     * ```
     */
    parseFieldsDefinition() {
      return this.optionalMany(
        i.TokenKind.BRACE_L,
        this.parseFieldDefinition,
        i.TokenKind.BRACE_R
      );
    }
    /**
     * FieldDefinition :
     *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
     */
    parseFieldDefinition() {
      const o = this._lexer.token, a = this.parseDescription(), h = this.parseName(), T = this.parseArgumentDefs();
      this.expectToken(i.TokenKind.COLON);
      const g = this.parseTypeReference(), x = this.parseConstDirectives();
      return this.node(o, {
        kind: r.Kind.FIELD_DEFINITION,
        description: a,
        name: h,
        arguments: T,
        type: g,
        directives: x
      });
    }
    /**
     * ArgumentsDefinition : ( InputValueDefinition+ )
     */
    parseArgumentDefs() {
      return this.optionalMany(
        i.TokenKind.PAREN_L,
        this.parseInputValueDef,
        i.TokenKind.PAREN_R
      );
    }
    /**
     * InputValueDefinition :
     *   - Description? Name : Type DefaultValue? Directives[Const]?
     */
    parseInputValueDef() {
      const o = this._lexer.token, a = this.parseDescription(), h = this.parseName();
      this.expectToken(i.TokenKind.COLON);
      const T = this.parseTypeReference();
      let g;
      this.expectOptionalToken(i.TokenKind.EQUALS) && (g = this.parseConstValueLiteral());
      const x = this.parseConstDirectives();
      return this.node(o, {
        kind: r.Kind.INPUT_VALUE_DEFINITION,
        description: a,
        name: h,
        type: T,
        defaultValue: g,
        directives: x
      });
    }
    /**
     * InterfaceTypeDefinition :
     *   - Description? interface Name Directives[Const]? FieldsDefinition?
     */
    parseInterfaceTypeDefinition() {
      const o = this._lexer.token, a = this.parseDescription();
      this.expectKeyword("interface");
      const h = this.parseName(), T = this.parseImplementsInterfaces(), g = this.parseConstDirectives(), x = this.parseFieldsDefinition();
      return this.node(o, {
        kind: r.Kind.INTERFACE_TYPE_DEFINITION,
        description: a,
        name: h,
        interfaces: T,
        directives: g,
        fields: x
      });
    }
    /**
     * UnionTypeDefinition :
     *   - Description? union Name Directives[Const]? UnionMemberTypes?
     */
    parseUnionTypeDefinition() {
      const o = this._lexer.token, a = this.parseDescription();
      this.expectKeyword("union");
      const h = this.parseName(), T = this.parseConstDirectives(), g = this.parseUnionMemberTypes();
      return this.node(o, {
        kind: r.Kind.UNION_TYPE_DEFINITION,
        description: a,
        name: h,
        directives: T,
        types: g
      });
    }
    /**
     * UnionMemberTypes :
     *   - = `|`? NamedType
     *   - UnionMemberTypes | NamedType
     */
    parseUnionMemberTypes() {
      return this.expectOptionalToken(i.TokenKind.EQUALS) ? this.delimitedMany(i.TokenKind.PIPE, this.parseNamedType) : [];
    }
    /**
     * EnumTypeDefinition :
     *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
     */
    parseEnumTypeDefinition() {
      const o = this._lexer.token, a = this.parseDescription();
      this.expectKeyword("enum");
      const h = this.parseName(), T = this.parseConstDirectives(), g = this.parseEnumValuesDefinition();
      return this.node(o, {
        kind: r.Kind.ENUM_TYPE_DEFINITION,
        description: a,
        name: h,
        directives: T,
        values: g
      });
    }
    /**
     * ```
     * EnumValuesDefinition : { EnumValueDefinition+ }
     * ```
     */
    parseEnumValuesDefinition() {
      return this.optionalMany(
        i.TokenKind.BRACE_L,
        this.parseEnumValueDefinition,
        i.TokenKind.BRACE_R
      );
    }
    /**
     * EnumValueDefinition : Description? EnumValue Directives[Const]?
     */
    parseEnumValueDefinition() {
      const o = this._lexer.token, a = this.parseDescription(), h = this.parseEnumValueName(), T = this.parseConstDirectives();
      return this.node(o, {
        kind: r.Kind.ENUM_VALUE_DEFINITION,
        description: a,
        name: h,
        directives: T
      });
    }
    /**
     * EnumValue : Name but not `true`, `false` or `null`
     */
    parseEnumValueName() {
      if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null")
        throw (0, e.syntaxError)(
          this._lexer.source,
          this._lexer.token.start,
          `${l(
            this._lexer.token
          )} is reserved and cannot be used for an enum value.`
        );
      return this.parseName();
    }
    /**
     * InputObjectTypeDefinition :
     *   - Description? input Name Directives[Const]? InputFieldsDefinition?
     */
    parseInputObjectTypeDefinition() {
      const o = this._lexer.token, a = this.parseDescription();
      this.expectKeyword("input");
      const h = this.parseName(), T = this.parseConstDirectives(), g = this.parseInputFieldsDefinition();
      return this.node(o, {
        kind: r.Kind.INPUT_OBJECT_TYPE_DEFINITION,
        description: a,
        name: h,
        directives: T,
        fields: g
      });
    }
    /**
     * ```
     * InputFieldsDefinition : { InputValueDefinition+ }
     * ```
     */
    parseInputFieldsDefinition() {
      return this.optionalMany(
        i.TokenKind.BRACE_L,
        this.parseInputValueDef,
        i.TokenKind.BRACE_R
      );
    }
    /**
     * TypeSystemExtension :
     *   - SchemaExtension
     *   - TypeExtension
     *
     * TypeExtension :
     *   - ScalarTypeExtension
     *   - ObjectTypeExtension
     *   - InterfaceTypeExtension
     *   - UnionTypeExtension
     *   - EnumTypeExtension
     *   - InputObjectTypeDefinition
     */
    parseTypeSystemExtension() {
      const o = this._lexer.lookahead();
      if (o.kind === i.TokenKind.NAME)
        switch (o.value) {
          case "schema":
            return this.parseSchemaExtension();
          case "scalar":
            return this.parseScalarTypeExtension();
          case "type":
            return this.parseObjectTypeExtension();
          case "interface":
            return this.parseInterfaceTypeExtension();
          case "union":
            return this.parseUnionTypeExtension();
          case "enum":
            return this.parseEnumTypeExtension();
          case "input":
            return this.parseInputObjectTypeExtension();
        }
      throw this.unexpected(o);
    }
    /**
     * ```
     * SchemaExtension :
     *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
     *  - extend schema Directives[Const]
     * ```
     */
    parseSchemaExtension() {
      const o = this._lexer.token;
      this.expectKeyword("extend"), this.expectKeyword("schema");
      const a = this.parseConstDirectives(), h = this.optionalMany(
        i.TokenKind.BRACE_L,
        this.parseOperationTypeDefinition,
        i.TokenKind.BRACE_R
      );
      if (a.length === 0 && h.length === 0)
        throw this.unexpected();
      return this.node(o, {
        kind: r.Kind.SCHEMA_EXTENSION,
        directives: a,
        operationTypes: h
      });
    }
    /**
     * ScalarTypeExtension :
     *   - extend scalar Name Directives[Const]
     */
    parseScalarTypeExtension() {
      const o = this._lexer.token;
      this.expectKeyword("extend"), this.expectKeyword("scalar");
      const a = this.parseName(), h = this.parseConstDirectives();
      if (h.length === 0)
        throw this.unexpected();
      return this.node(o, {
        kind: r.Kind.SCALAR_TYPE_EXTENSION,
        name: a,
        directives: h
      });
    }
    /**
     * ObjectTypeExtension :
     *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
     *  - extend type Name ImplementsInterfaces? Directives[Const]
     *  - extend type Name ImplementsInterfaces
     */
    parseObjectTypeExtension() {
      const o = this._lexer.token;
      this.expectKeyword("extend"), this.expectKeyword("type");
      const a = this.parseName(), h = this.parseImplementsInterfaces(), T = this.parseConstDirectives(), g = this.parseFieldsDefinition();
      if (h.length === 0 && T.length === 0 && g.length === 0)
        throw this.unexpected();
      return this.node(o, {
        kind: r.Kind.OBJECT_TYPE_EXTENSION,
        name: a,
        interfaces: h,
        directives: T,
        fields: g
      });
    }
    /**
     * InterfaceTypeExtension :
     *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
     *  - extend interface Name ImplementsInterfaces? Directives[Const]
     *  - extend interface Name ImplementsInterfaces
     */
    parseInterfaceTypeExtension() {
      const o = this._lexer.token;
      this.expectKeyword("extend"), this.expectKeyword("interface");
      const a = this.parseName(), h = this.parseImplementsInterfaces(), T = this.parseConstDirectives(), g = this.parseFieldsDefinition();
      if (h.length === 0 && T.length === 0 && g.length === 0)
        throw this.unexpected();
      return this.node(o, {
        kind: r.Kind.INTERFACE_TYPE_EXTENSION,
        name: a,
        interfaces: h,
        directives: T,
        fields: g
      });
    }
    /**
     * UnionTypeExtension :
     *   - extend union Name Directives[Const]? UnionMemberTypes
     *   - extend union Name Directives[Const]
     */
    parseUnionTypeExtension() {
      const o = this._lexer.token;
      this.expectKeyword("extend"), this.expectKeyword("union");
      const a = this.parseName(), h = this.parseConstDirectives(), T = this.parseUnionMemberTypes();
      if (h.length === 0 && T.length === 0)
        throw this.unexpected();
      return this.node(o, {
        kind: r.Kind.UNION_TYPE_EXTENSION,
        name: a,
        directives: h,
        types: T
      });
    }
    /**
     * EnumTypeExtension :
     *   - extend enum Name Directives[Const]? EnumValuesDefinition
     *   - extend enum Name Directives[Const]
     */
    parseEnumTypeExtension() {
      const o = this._lexer.token;
      this.expectKeyword("extend"), this.expectKeyword("enum");
      const a = this.parseName(), h = this.parseConstDirectives(), T = this.parseEnumValuesDefinition();
      if (h.length === 0 && T.length === 0)
        throw this.unexpected();
      return this.node(o, {
        kind: r.Kind.ENUM_TYPE_EXTENSION,
        name: a,
        directives: h,
        values: T
      });
    }
    /**
     * InputObjectTypeExtension :
     *   - extend input Name Directives[Const]? InputFieldsDefinition
     *   - extend input Name Directives[Const]
     */
    parseInputObjectTypeExtension() {
      const o = this._lexer.token;
      this.expectKeyword("extend"), this.expectKeyword("input");
      const a = this.parseName(), h = this.parseConstDirectives(), T = this.parseInputFieldsDefinition();
      if (h.length === 0 && T.length === 0)
        throw this.unexpected();
      return this.node(o, {
        kind: r.Kind.INPUT_OBJECT_TYPE_EXTENSION,
        name: a,
        directives: h,
        fields: T
      });
    }
    /**
     * ```
     * DirectiveDefinition :
     *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
     * ```
     */
    parseDirectiveDefinition() {
      const o = this._lexer.token, a = this.parseDescription();
      this.expectKeyword("directive"), this.expectToken(i.TokenKind.AT);
      const h = this.parseName(), T = this.parseArgumentDefs(), g = this.expectOptionalKeyword("repeatable");
      this.expectKeyword("on");
      const x = this.parseDirectiveLocations();
      return this.node(o, {
        kind: r.Kind.DIRECTIVE_DEFINITION,
        description: a,
        name: h,
        arguments: T,
        repeatable: g,
        locations: x
      });
    }
    /**
     * DirectiveLocations :
     *   - `|`? DirectiveLocation
     *   - DirectiveLocations | DirectiveLocation
     */
    parseDirectiveLocations() {
      return this.delimitedMany(
        i.TokenKind.PIPE,
        this.parseDirectiveLocation
      );
    }
    /*
     * DirectiveLocation :
     *   - ExecutableDirectiveLocation
     *   - TypeSystemDirectiveLocation
     *
     * ExecutableDirectiveLocation : one of
     *   `QUERY`
     *   `MUTATION`
     *   `SUBSCRIPTION`
     *   `FIELD`
     *   `FRAGMENT_DEFINITION`
     *   `FRAGMENT_SPREAD`
     *   `INLINE_FRAGMENT`
     *
     * TypeSystemDirectiveLocation : one of
     *   `SCHEMA`
     *   `SCALAR`
     *   `OBJECT`
     *   `FIELD_DEFINITION`
     *   `ARGUMENT_DEFINITION`
     *   `INTERFACE`
     *   `UNION`
     *   `ENUM`
     *   `ENUM_VALUE`
     *   `INPUT_OBJECT`
     *   `INPUT_FIELD_DEFINITION`
     */
    parseDirectiveLocation() {
      const o = this._lexer.token, a = this.parseName();
      if (Object.prototype.hasOwnProperty.call(
        c.DirectiveLocation,
        a.value
      ))
        return a;
      throw this.unexpected(o);
    }
    // Core parsing utility functions
    /**
     * Returns a node that, if configured to do so, sets a "loc" field as a
     * location object, used to identify the place in the source that created a
     * given parsed object.
     */
    node(o, a) {
      return this._options.noLocation !== !0 && (a.loc = new n.Location(
        o,
        this._lexer.lastToken,
        this._lexer.source
      )), a;
    }
    /**
     * Determines if the next token is of a given kind
     */
    peek(o) {
      return this._lexer.token.kind === o;
    }
    /**
     * If the next token is of the given kind, return that token after advancing the lexer.
     * Otherwise, do not change the parser state and throw an error.
     */
    expectToken(o) {
      const a = this._lexer.token;
      if (a.kind === o)
        return this.advanceLexer(), a;
      throw (0, e.syntaxError)(
        this._lexer.source,
        a.start,
        `Expected ${N(o)}, found ${l(a)}.`
      );
    }
    /**
     * If the next token is of the given kind, return "true" after advancing the lexer.
     * Otherwise, do not change the parser state and return "false".
     */
    expectOptionalToken(o) {
      return this._lexer.token.kind === o ? (this.advanceLexer(), !0) : !1;
    }
    /**
     * If the next token is a given keyword, advance the lexer.
     * Otherwise, do not change the parser state and throw an error.
     */
    expectKeyword(o) {
      const a = this._lexer.token;
      if (a.kind === i.TokenKind.NAME && a.value === o)
        this.advanceLexer();
      else
        throw (0, e.syntaxError)(
          this._lexer.source,
          a.start,
          `Expected "${o}", found ${l(a)}.`
        );
    }
    /**
     * If the next token is a given keyword, return "true" after advancing the lexer.
     * Otherwise, do not change the parser state and return "false".
     */
    expectOptionalKeyword(o) {
      const a = this._lexer.token;
      return a.kind === i.TokenKind.NAME && a.value === o ? (this.advanceLexer(), !0) : !1;
    }
    /**
     * Helper function for creating an error when an unexpected lexed token is encountered.
     */
    unexpected(o) {
      const a = o ?? this._lexer.token;
      return (0, e.syntaxError)(
        this._lexer.source,
        a.start,
        `Unexpected ${l(a)}.`
      );
    }
    /**
     * Returns a possibly empty list of parse nodes, determined by the parseFn.
     * This list begins with a lex token of openKind and ends with a lex token of closeKind.
     * Advances the parser to the next lex token after the closing token.
     */
    any(o, a, h) {
      this.expectToken(o);
      const T = [];
      for (; !this.expectOptionalToken(h); )
        T.push(a.call(this));
      return T;
    }
    /**
     * Returns a list of parse nodes, determined by the parseFn.
     * It can be empty only if open token is missing otherwise it will always return non-empty list
     * that begins with a lex token of openKind and ends with a lex token of closeKind.
     * Advances the parser to the next lex token after the closing token.
     */
    optionalMany(o, a, h) {
      if (this.expectOptionalToken(o)) {
        const T = [];
        do
          T.push(a.call(this));
        while (!this.expectOptionalToken(h));
        return T;
      }
      return [];
    }
    /**
     * Returns a non-empty list of parse nodes, determined by the parseFn.
     * This list begins with a lex token of openKind and ends with a lex token of closeKind.
     * Advances the parser to the next lex token after the closing token.
     */
    many(o, a, h) {
      this.expectToken(o);
      const T = [];
      do
        T.push(a.call(this));
      while (!this.expectOptionalToken(h));
      return T;
    }
    /**
     * Returns a non-empty list of parse nodes, determined by the parseFn.
     * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
     * Advances the parser to the next lex token after last item in the list.
     */
    delimitedMany(o, a) {
      this.expectOptionalToken(o);
      const h = [];
      do
        h.push(a.call(this));
      while (this.expectOptionalToken(o));
      return h;
    }
    advanceLexer() {
      const { maxTokens: o } = this._options, a = this._lexer.advance();
      if (a.kind !== i.TokenKind.EOF && (++this._tokenCounter, o !== void 0 && this._tokenCounter > o))
        throw (0, e.syntaxError)(
          this._lexer.source,
          a.start,
          `Document contains more that ${o} tokens. Parsing aborted.`
        );
    }
  }
  R.Parser = t;
  function l(v) {
    const o = v.value;
    return N(v.kind) + (o != null ? ` "${o}"` : "");
  }
  function N(v) {
    return (0, s.isPunctuatorTokenKind)(v) ? `"${v}"` : v;
  }
  return R;
}
var de = {}, pe = {}, qe;
function Mt() {
  if (qe) return pe;
  qe = 1, Object.defineProperty(pe, "__esModule", {
    value: !0
  }), pe.printString = e;
  function e(s) {
    return `"${s.replace(n, c)}"`;
  }
  const n = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
  function c(s) {
    return r[s.charCodeAt(0)];
  }
  const r = [
    "\\u0000",
    "\\u0001",
    "\\u0002",
    "\\u0003",
    "\\u0004",
    "\\u0005",
    "\\u0006",
    "\\u0007",
    "\\b",
    "\\t",
    "\\n",
    "\\u000B",
    "\\f",
    "\\r",
    "\\u000E",
    "\\u000F",
    "\\u0010",
    "\\u0011",
    "\\u0012",
    "\\u0013",
    "\\u0014",
    "\\u0015",
    "\\u0016",
    "\\u0017",
    "\\u0018",
    "\\u0019",
    "\\u001A",
    "\\u001B",
    "\\u001C",
    "\\u001D",
    "\\u001E",
    "\\u001F",
    "",
    "",
    '\\"',
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // 2F
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // 3F
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // 4F
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "\\\\",
    "",
    "",
    "",
    // 5F
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // 6F
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "\\u007F",
    "\\u0080",
    "\\u0081",
    "\\u0082",
    "\\u0083",
    "\\u0084",
    "\\u0085",
    "\\u0086",
    "\\u0087",
    "\\u0088",
    "\\u0089",
    "\\u008A",
    "\\u008B",
    "\\u008C",
    "\\u008D",
    "\\u008E",
    "\\u008F",
    "\\u0090",
    "\\u0091",
    "\\u0092",
    "\\u0093",
    "\\u0094",
    "\\u0095",
    "\\u0096",
    "\\u0097",
    "\\u0098",
    "\\u0099",
    "\\u009A",
    "\\u009B",
    "\\u009C",
    "\\u009D",
    "\\u009E",
    "\\u009F"
  ];
  return pe;
}
var F = {}, Ye;
function ft() {
  if (Ye) return F;
  Ye = 1, Object.defineProperty(F, "__esModule", {
    value: !0
  }), F.BREAK = void 0, F.getEnterLeaveForKind = m, F.getVisitFn = E, F.visit = u, F.visitInParallel = i;
  var e = /* @__PURE__ */ rt(), n = /* @__PURE__ */ Ie(), c = /* @__PURE__ */ Ee(), r = /* @__PURE__ */ Te();
  const s = Object.freeze({});
  F.BREAK = s;
  function u(d, y, t = c.QueryDocumentKeys) {
    const l = /* @__PURE__ */ new Map();
    for (const O of Object.values(r.Kind))
      l.set(O, m(y, O));
    let N, v = Array.isArray(d), o = [d], a = -1, h = [], T = d, g, x;
    const b = [], A = [];
    do {
      a++;
      const O = a === o.length, _ = O && h.length !== 0;
      if (O) {
        if (g = A.length === 0 ? void 0 : b[b.length - 1], T = x, x = A.pop(), _)
          if (v) {
            T = T.slice();
            let p = 0;
            for (const [I, S] of h) {
              const D = I - p;
              S === null ? (T.splice(D, 1), p++) : T[D] = S;
            }
          } else {
            T = Object.defineProperties(
              {},
              Object.getOwnPropertyDescriptors(T)
            );
            for (const [p, I] of h)
              T[p] = I;
          }
        a = N.index, o = N.keys, h = N.edits, v = N.inArray, N = N.prev;
      } else if (x) {
        if (g = v ? a : o[a], T = x[g], T == null)
          continue;
        b.push(g);
      }
      let k;
      if (!Array.isArray(T)) {
        var H, W;
        (0, c.isNode)(T) || (0, e.devAssert)(
          !1,
          `Invalid AST Node: ${(0, n.inspect)(T)}.`
        );
        const p = O ? (H = l.get(T.kind)) === null || H === void 0 ? void 0 : H.leave : (W = l.get(T.kind)) === null || W === void 0 ? void 0 : W.enter;
        if (k = p == null ? void 0 : p.call(y, T, g, x, b, A), k === s)
          break;
        if (k === !1) {
          if (!O) {
            b.pop();
            continue;
          }
        } else if (k !== void 0 && (h.push([g, k]), !O))
          if ((0, c.isNode)(k))
            T = k;
          else {
            b.pop();
            continue;
          }
      }
      if (k === void 0 && _ && h.push([g, T]), O)
        b.pop();
      else {
        var f;
        N = {
          inArray: v,
          index: a,
          keys: o,
          edits: h,
          prev: N
        }, v = Array.isArray(T), o = v ? T : (f = t[T.kind]) !== null && f !== void 0 ? f : [], a = -1, h = [], x && A.push(x), x = T;
      }
    } while (N !== void 0);
    return h.length !== 0 ? h[h.length - 1][1] : d;
  }
  function i(d) {
    const y = new Array(d.length).fill(null), t = /* @__PURE__ */ Object.create(null);
    for (const l of Object.values(r.Kind)) {
      let N = !1;
      const v = new Array(d.length).fill(void 0), o = new Array(d.length).fill(void 0);
      for (let h = 0; h < d.length; ++h) {
        const { enter: T, leave: g } = m(d[h], l);
        N || (N = T != null || g != null), v[h] = T, o[h] = g;
      }
      if (!N)
        continue;
      const a = {
        enter(...h) {
          const T = h[0];
          for (let x = 0; x < d.length; x++)
            if (y[x] === null) {
              var g;
              const b = (g = v[x]) === null || g === void 0 ? void 0 : g.apply(d[x], h);
              if (b === !1)
                y[x] = T;
              else if (b === s)
                y[x] = s;
              else if (b !== void 0)
                return b;
            }
        },
        leave(...h) {
          const T = h[0];
          for (let x = 0; x < d.length; x++)
            if (y[x] === null) {
              var g;
              const b = (g = o[x]) === null || g === void 0 ? void 0 : g.apply(d[x], h);
              if (b === s)
                y[x] = s;
              else if (b !== void 0 && b !== !1)
                return b;
            } else y[x] === T && (y[x] = null);
        }
      };
      t[l] = a;
    }
    return t;
  }
  function m(d, y) {
    const t = d[y];
    return typeof t == "object" ? t : typeof t == "function" ? {
      enter: t,
      leave: void 0
    } : {
      enter: d.enter,
      leave: d.leave
    };
  }
  function E(d, y, t) {
    const { enter: l, leave: N } = m(d, y);
    return t ? N : l;
  }
  return F;
}
var Qe;
function Vt() {
  if (Qe) return de;
  Qe = 1, Object.defineProperty(de, "__esModule", {
    value: !0
  }), de.print = r;
  var e = /* @__PURE__ */ lt(), n = /* @__PURE__ */ Mt(), c = /* @__PURE__ */ ft();
  function r(t) {
    return (0, c.visit)(t, u);
  }
  const s = 80, u = {
    Name: {
      leave: (t) => t.value
    },
    Variable: {
      leave: (t) => "$" + t.name
    },
    // Document
    Document: {
      leave: (t) => i(t.definitions, `

`)
    },
    OperationDefinition: {
      leave(t) {
        const l = E("(", i(t.variableDefinitions, ", "), ")"), N = i(
          [
            t.operation,
            i([t.name, l]),
            i(t.directives, " ")
          ],
          " "
        );
        return (N === "query" ? "" : N + " ") + t.selectionSet;
      }
    },
    VariableDefinition: {
      leave: ({ variable: t, type: l, defaultValue: N, directives: v }) => t + ": " + l + E(" = ", N) + E(" ", i(v, " "))
    },
    SelectionSet: {
      leave: ({ selections: t }) => m(t)
    },
    Field: {
      leave({ alias: t, name: l, arguments: N, directives: v, selectionSet: o }) {
        const a = E("", t, ": ") + l;
        let h = a + E("(", i(N, ", "), ")");
        return h.length > s && (h = a + E(`(
`, d(i(N, `
`)), `
)`)), i([h, i(v, " "), o], " ");
      }
    },
    Argument: {
      leave: ({ name: t, value: l }) => t + ": " + l
    },
    // Fragments
    FragmentSpread: {
      leave: ({ name: t, directives: l }) => "..." + t + E(" ", i(l, " "))
    },
    InlineFragment: {
      leave: ({ typeCondition: t, directives: l, selectionSet: N }) => i(
        [
          "...",
          E("on ", t),
          i(l, " "),
          N
        ],
        " "
      )
    },
    FragmentDefinition: {
      leave: ({ name: t, typeCondition: l, variableDefinitions: N, directives: v, selectionSet: o }) => (
        // or removed in the future.
        `fragment ${t}${E("(", i(N, ", "), ")")} on ${l} ${E("", i(v, " "), " ")}` + o
      )
    },
    // Value
    IntValue: {
      leave: ({ value: t }) => t
    },
    FloatValue: {
      leave: ({ value: t }) => t
    },
    StringValue: {
      leave: ({ value: t, block: l }) => l ? (0, e.printBlockString)(t) : (0, n.printString)(t)
    },
    BooleanValue: {
      leave: ({ value: t }) => t ? "true" : "false"
    },
    NullValue: {
      leave: () => "null"
    },
    EnumValue: {
      leave: ({ value: t }) => t
    },
    ListValue: {
      leave: ({ values: t }) => "[" + i(t, ", ") + "]"
    },
    ObjectValue: {
      leave: ({ fields: t }) => "{" + i(t, ", ") + "}"
    },
    ObjectField: {
      leave: ({ name: t, value: l }) => t + ": " + l
    },
    // Directive
    Directive: {
      leave: ({ name: t, arguments: l }) => "@" + t + E("(", i(l, ", "), ")")
    },
    // Type
    NamedType: {
      leave: ({ name: t }) => t
    },
    ListType: {
      leave: ({ type: t }) => "[" + t + "]"
    },
    NonNullType: {
      leave: ({ type: t }) => t + "!"
    },
    // Type System Definitions
    SchemaDefinition: {
      leave: ({ description: t, directives: l, operationTypes: N }) => E("", t, `
`) + i(["schema", i(l, " "), m(N)], " ")
    },
    OperationTypeDefinition: {
      leave: ({ operation: t, type: l }) => t + ": " + l
    },
    ScalarTypeDefinition: {
      leave: ({ description: t, name: l, directives: N }) => E("", t, `
`) + i(["scalar", l, i(N, " ")], " ")
    },
    ObjectTypeDefinition: {
      leave: ({ description: t, name: l, interfaces: N, directives: v, fields: o }) => E("", t, `
`) + i(
        [
          "type",
          l,
          E("implements ", i(N, " & ")),
          i(v, " "),
          m(o)
        ],
        " "
      )
    },
    FieldDefinition: {
      leave: ({ description: t, name: l, arguments: N, type: v, directives: o }) => E("", t, `
`) + l + (y(N) ? E(`(
`, d(i(N, `
`)), `
)`) : E("(", i(N, ", "), ")")) + ": " + v + E(" ", i(o, " "))
    },
    InputValueDefinition: {
      leave: ({ description: t, name: l, type: N, defaultValue: v, directives: o }) => E("", t, `
`) + i(
        [l + ": " + N, E("= ", v), i(o, " ")],
        " "
      )
    },
    InterfaceTypeDefinition: {
      leave: ({ description: t, name: l, interfaces: N, directives: v, fields: o }) => E("", t, `
`) + i(
        [
          "interface",
          l,
          E("implements ", i(N, " & ")),
          i(v, " "),
          m(o)
        ],
        " "
      )
    },
    UnionTypeDefinition: {
      leave: ({ description: t, name: l, directives: N, types: v }) => E("", t, `
`) + i(
        ["union", l, i(N, " "), E("= ", i(v, " | "))],
        " "
      )
    },
    EnumTypeDefinition: {
      leave: ({ description: t, name: l, directives: N, values: v }) => E("", t, `
`) + i(["enum", l, i(N, " "), m(v)], " ")
    },
    EnumValueDefinition: {
      leave: ({ description: t, name: l, directives: N }) => E("", t, `
`) + i([l, i(N, " ")], " ")
    },
    InputObjectTypeDefinition: {
      leave: ({ description: t, name: l, directives: N, fields: v }) => E("", t, `
`) + i(["input", l, i(N, " "), m(v)], " ")
    },
    DirectiveDefinition: {
      leave: ({ description: t, name: l, arguments: N, repeatable: v, locations: o }) => E("", t, `
`) + "directive @" + l + (y(N) ? E(`(
`, d(i(N, `
`)), `
)`) : E("(", i(N, ", "), ")")) + (v ? " repeatable" : "") + " on " + i(o, " | ")
    },
    SchemaExtension: {
      leave: ({ directives: t, operationTypes: l }) => i(
        ["extend schema", i(t, " "), m(l)],
        " "
      )
    },
    ScalarTypeExtension: {
      leave: ({ name: t, directives: l }) => i(["extend scalar", t, i(l, " ")], " ")
    },
    ObjectTypeExtension: {
      leave: ({ name: t, interfaces: l, directives: N, fields: v }) => i(
        [
          "extend type",
          t,
          E("implements ", i(l, " & ")),
          i(N, " "),
          m(v)
        ],
        " "
      )
    },
    InterfaceTypeExtension: {
      leave: ({ name: t, interfaces: l, directives: N, fields: v }) => i(
        [
          "extend interface",
          t,
          E("implements ", i(l, " & ")),
          i(N, " "),
          m(v)
        ],
        " "
      )
    },
    UnionTypeExtension: {
      leave: ({ name: t, directives: l, types: N }) => i(
        [
          "extend union",
          t,
          i(l, " "),
          E("= ", i(N, " | "))
        ],
        " "
      )
    },
    EnumTypeExtension: {
      leave: ({ name: t, directives: l, values: N }) => i(["extend enum", t, i(l, " "), m(N)], " ")
    },
    InputObjectTypeExtension: {
      leave: ({ name: t, directives: l, fields: N }) => i(["extend input", t, i(l, " "), m(N)], " ")
    }
  };
  function i(t, l = "") {
    var N;
    return (N = t == null ? void 0 : t.filter((v) => v).join(l)) !== null && N !== void 0 ? N : "";
  }
  function m(t) {
    return E(`{
`, d(i(t, `
`)), `
}`);
  }
  function E(t, l, N = "") {
    return l != null && l !== "" ? t + l + N : "";
  }
  function d(t) {
    return E("  ", t.replace(/\n/g, `
  `));
  }
  function y(t) {
    var l;
    return (l = t == null ? void 0 : t.some((N) => N.includes(`
`))) !== null && l !== void 0 ? l : !1;
  }
  return de;
}
var K = {}, Je;
function Bt() {
  if (Je) return K;
  Je = 1, Object.defineProperty(K, "__esModule", {
    value: !0
  }), K.isConstValueNode = u, K.isDefinitionNode = n, K.isExecutableDefinitionNode = c, K.isSelectionNode = r, K.isTypeDefinitionNode = E, K.isTypeExtensionNode = y, K.isTypeNode = i, K.isTypeSystemDefinitionNode = m, K.isTypeSystemExtensionNode = d, K.isValueNode = s;
  var e = /* @__PURE__ */ Te();
  function n(t) {
    return c(t) || m(t) || d(t);
  }
  function c(t) {
    return t.kind === e.Kind.OPERATION_DEFINITION || t.kind === e.Kind.FRAGMENT_DEFINITION;
  }
  function r(t) {
    return t.kind === e.Kind.FIELD || t.kind === e.Kind.FRAGMENT_SPREAD || t.kind === e.Kind.INLINE_FRAGMENT;
  }
  function s(t) {
    return t.kind === e.Kind.VARIABLE || t.kind === e.Kind.INT || t.kind === e.Kind.FLOAT || t.kind === e.Kind.STRING || t.kind === e.Kind.BOOLEAN || t.kind === e.Kind.NULL || t.kind === e.Kind.ENUM || t.kind === e.Kind.LIST || t.kind === e.Kind.OBJECT;
  }
  function u(t) {
    return s(t) && (t.kind === e.Kind.LIST ? t.values.some(u) : t.kind === e.Kind.OBJECT ? t.fields.some((l) => u(l.value)) : t.kind !== e.Kind.VARIABLE);
  }
  function i(t) {
    return t.kind === e.Kind.NAMED_TYPE || t.kind === e.Kind.LIST_TYPE || t.kind === e.Kind.NON_NULL_TYPE;
  }
  function m(t) {
    return t.kind === e.Kind.SCHEMA_DEFINITION || E(t) || t.kind === e.Kind.DIRECTIVE_DEFINITION;
  }
  function E(t) {
    return t.kind === e.Kind.SCALAR_TYPE_DEFINITION || t.kind === e.Kind.OBJECT_TYPE_DEFINITION || t.kind === e.Kind.INTERFACE_TYPE_DEFINITION || t.kind === e.Kind.UNION_TYPE_DEFINITION || t.kind === e.Kind.ENUM_TYPE_DEFINITION || t.kind === e.Kind.INPUT_OBJECT_TYPE_DEFINITION;
  }
  function d(t) {
    return t.kind === e.Kind.SCHEMA_EXTENSION || y(t);
  }
  function y(t) {
    return t.kind === e.Kind.SCALAR_TYPE_EXTENSION || t.kind === e.Kind.OBJECT_TYPE_EXTENSION || t.kind === e.Kind.INTERFACE_TYPE_EXTENSION || t.kind === e.Kind.UNION_TYPE_EXTENSION || t.kind === e.Kind.ENUM_TYPE_EXTENSION || t.kind === e.Kind.INPUT_OBJECT_TYPE_EXTENSION;
  }
  return K;
}
var Xe;
function Ut() {
  return Xe || (Xe = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "BREAK", {
      enumerable: !0,
      get: function() {
        return d.BREAK;
      }
    }), Object.defineProperty(e, "DirectiveLocation", {
      enumerable: !0,
      get: function() {
        return l.DirectiveLocation;
      }
    }), Object.defineProperty(e, "Kind", {
      enumerable: !0,
      get: function() {
        return s.Kind;
      }
    }), Object.defineProperty(e, "Lexer", {
      enumerable: !0,
      get: function() {
        return i.Lexer;
      }
    }), Object.defineProperty(e, "Location", {
      enumerable: !0,
      get: function() {
        return y.Location;
      }
    }), Object.defineProperty(e, "OperationTypeNode", {
      enumerable: !0,
      get: function() {
        return y.OperationTypeNode;
      }
    }), Object.defineProperty(e, "Source", {
      enumerable: !0,
      get: function() {
        return n.Source;
      }
    }), Object.defineProperty(e, "Token", {
      enumerable: !0,
      get: function() {
        return y.Token;
      }
    }), Object.defineProperty(e, "TokenKind", {
      enumerable: !0,
      get: function() {
        return u.TokenKind;
      }
    }), Object.defineProperty(e, "getEnterLeaveForKind", {
      enumerable: !0,
      get: function() {
        return d.getEnterLeaveForKind;
      }
    }), Object.defineProperty(e, "getLocation", {
      enumerable: !0,
      get: function() {
        return c.getLocation;
      }
    }), Object.defineProperty(e, "getVisitFn", {
      enumerable: !0,
      get: function() {
        return d.getVisitFn;
      }
    }), Object.defineProperty(e, "isConstValueNode", {
      enumerable: !0,
      get: function() {
        return t.isConstValueNode;
      }
    }), Object.defineProperty(e, "isDefinitionNode", {
      enumerable: !0,
      get: function() {
        return t.isDefinitionNode;
      }
    }), Object.defineProperty(e, "isExecutableDefinitionNode", {
      enumerable: !0,
      get: function() {
        return t.isExecutableDefinitionNode;
      }
    }), Object.defineProperty(e, "isSelectionNode", {
      enumerable: !0,
      get: function() {
        return t.isSelectionNode;
      }
    }), Object.defineProperty(e, "isTypeDefinitionNode", {
      enumerable: !0,
      get: function() {
        return t.isTypeDefinitionNode;
      }
    }), Object.defineProperty(e, "isTypeExtensionNode", {
      enumerable: !0,
      get: function() {
        return t.isTypeExtensionNode;
      }
    }), Object.defineProperty(e, "isTypeNode", {
      enumerable: !0,
      get: function() {
        return t.isTypeNode;
      }
    }), Object.defineProperty(e, "isTypeSystemDefinitionNode", {
      enumerable: !0,
      get: function() {
        return t.isTypeSystemDefinitionNode;
      }
    }), Object.defineProperty(e, "isTypeSystemExtensionNode", {
      enumerable: !0,
      get: function() {
        return t.isTypeSystemExtensionNode;
      }
    }), Object.defineProperty(e, "isValueNode", {
      enumerable: !0,
      get: function() {
        return t.isValueNode;
      }
    }), Object.defineProperty(e, "parse", {
      enumerable: !0,
      get: function() {
        return m.parse;
      }
    }), Object.defineProperty(e, "parseConstValue", {
      enumerable: !0,
      get: function() {
        return m.parseConstValue;
      }
    }), Object.defineProperty(e, "parseType", {
      enumerable: !0,
      get: function() {
        return m.parseType;
      }
    }), Object.defineProperty(e, "parseValue", {
      enumerable: !0,
      get: function() {
        return m.parseValue;
      }
    }), Object.defineProperty(e, "print", {
      enumerable: !0,
      get: function() {
        return E.print;
      }
    }), Object.defineProperty(e, "printLocation", {
      enumerable: !0,
      get: function() {
        return r.printLocation;
      }
    }), Object.defineProperty(e, "printSourceLocation", {
      enumerable: !0,
      get: function() {
        return r.printSourceLocation;
      }
    }), Object.defineProperty(e, "visit", {
      enumerable: !0,
      get: function() {
        return d.visit;
      }
    }), Object.defineProperty(e, "visitInParallel", {
      enumerable: !0,
      get: function() {
        return d.visitInParallel;
      }
    });
    var n = /* @__PURE__ */ st(), c = /* @__PURE__ */ _e(), r = /* @__PURE__ */ ot(), s = /* @__PURE__ */ Te(), u = /* @__PURE__ */ ge(), i = /* @__PURE__ */ dt(), m = /* @__PURE__ */ wt(), E = /* @__PURE__ */ Vt(), d = /* @__PURE__ */ ft(), y = /* @__PURE__ */ Ee(), t = /* @__PURE__ */ Bt(), l = /* @__PURE__ */ pt();
  }(ye)), ye;
}
var $t = /* @__PURE__ */ Ut();
const Gt = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/, ht = (e) => typeof e != "string" || !Gt.test(e) ? !1 : new Date(e).toISOString() === e, ke = "Date", Tt = new xt({
  name: ke,
  description: "Date type",
  parseValue(e) {
    return new Date(e);
  },
  serialize(e) {
    return ht(e) ? e : e.toISOString();
  },
  parseLiteral(e) {
    if (e.kind !== $t.Kind.STRING)
      throw new xe(
        `Query error: Can only parse dates strings, got a: ${e.kind}`,
        {
          nodes: [e]
        }
      );
    if (Number.isNaN(Date.parse(e.value)))
      throw new xe("Query error: not a valid date", {
        nodes: [e]
      });
    return new Date(e.value);
  }
}), qt = (e) => !Number.isNaN(Number.parseFloat(e)) && Number.isFinite(e), ze = (e) => e.every(qt), Yt = (e) => Number.isInteger(e), He = (e) => e.every(Yt), Qt = (e) => typeof e == "boolean", We = (e) => e.every(Qt), Jt = (e) => typeof e == "string", Ze = (e) => e.every(Jt), Xt = (e) => Array.isArray(e), zt = (e) => e.every(Xt), Ht = (e) => e instanceof Date || ht(e), Wt = (e) => e.every(Ht), Zt = (e) => Object.prototype.toString.call(e) === "[object Object]", et = (e) => e.every(Zt), L = (e, n) => n ? new te(e) : e, Et = (e, n = [], c = !1) => {
  if (e === "id" || e.substr(e.length - 3) === "_id")
    return L(ne, c);
  if (n.length > 0) {
    if (zt(n)) {
      const r = n.reduce((s, u) => (u.forEach((i) => s.push(i)), s), []);
      return We(r) ? L(
        new P(Ne),
        c
      ) : Ze(r) ? L(
        new P(M),
        c
      ) : He(r) ? L(
        new P(w),
        c
      ) : ze(r) ? L(
        new P(me),
        c
      ) : et(r) ? L(ve, c) : L(
        new P(M),
        c
      );
    }
    if (We(n))
      return L(Ne, c);
    if (Wt(n))
      return L(Tt, c);
    if (Ze(n))
      return L(M, c);
    if (He(n))
      return L(w, c);
    if (ze(n))
      return L(me, c);
    if (et(n))
      return L(ve, c);
  }
  return L(M, c);
}, yt = (e) => e.reduce((n, c) => {
  for (const r of Object.keys(c))
    n[r] || (n[r] = []), c[r] != null && n[r].push(c[r]);
  return n;
}, {}), he = (e, n = !0) => {
  const c = yt(e), r = e.length;
  return Object.keys(c).reduce(
    (s, u) => (s[u] = {
      type: Et(
        u,
        c[u],
        n ? c[u].length === r : !1
      )
    }, s),
    {}
  );
}, en = (e) => ie(e), z = (e) => ie(Oe(e)), tn = (e) => X(e.substr(0, e.length - 3)), nn = (e) => `${Oe(e)}_id`, Nt = (e) => z(e.substr(0, e.length - 3)), rn = (e) => Object.keys(e).map((n) => ({
  name: ie(Oe(n)),
  fields: he(e[n])
})).map((n) => new fe(n)), sn = (e) => {
  const n = yt(e);
  return Object.keys(n).reduce((c, r) => {
    const s = Et(
      r,
      n[r],
      !1
    );
    return bt(s) || ((s === w || s === me || s === M || s.name === ke) && (c[`${r}_lt`] = { type: s }, c[`${r}_lte`] = { type: s }, c[`${r}_gt`] = { type: s }, c[`${r}_gte`] = { type: s }), s !== Ne && (c[`${r}_neq`] = { type: s })), c;
  }, {});
}, mt = (e) => Object.keys(e).reduce(
  (n, c) => Object.assign({}, n, {
    [z(c)]: new it({
      name: `${z(c)}Filter`,
      fields: Object.assign(
        {
          q: { type: M }
        },
        {
          ids: { type: new P(ne) }
        },
        he(e[c], !1),
        sn(e[c])
      )
    })
  }),
  {}
), vt = (e) => e.endsWith("_id"), on = (e) => {
  const n = rn(e), c = n.reduce(
    (d, y) => (d[y.name] = y, d),
    {}
  ), r = mt(e), s = new fe({
    name: "ListMetadata",
    fields: {
      count: { type: w }
    }
  }), u = new fe({
    name: "Query",
    fields: n.reduce(
      (d, y) => (d[y.name] = {
        type: c[y.name],
        args: {
          id: { type: new te(ne) }
        }
      }, d[`all${ie(X(y.name))}`] = {
        type: new P(c[y.name]),
        args: {
          page: { type: w },
          perPage: { type: w },
          sortField: { type: M },
          sortOrder: { type: M },
          filter: { type: r[y.name] }
        }
      }, d[`_all${ie(X(y.name))}Meta`] = {
        type: s,
        args: {
          page: { type: w },
          perPage: { type: w },
          filter: { type: r[y.name] }
        }
      }, d),
      {}
    )
  }), i = new fe({
    name: "Mutation",
    fields: n.reduce(
      (d, y) => {
        const t = c[y.name].getFields(), l = Object.keys(t).reduce(
          (h, T) => (h[T] = Object.assign(
            {},
            t[T],
            {
              type: T !== "id" && t[T].type instanceof te ? t[T].type.ofType : t[T].type
            }
          ), h),
          {}
        ), { id: N, ...v } = t, o = Object.keys(v).reduce(
          (h, T) => (h[T] = Object.assign(
            {},
            v[T]
          ), delete h[T].resolve, h),
          {}
        ), a = new it({
          name: `${y.name}Input`,
          fields: o
        });
        return d[`create${y.name}`] = {
          type: c[y.name],
          args: v
        }, d[`createMany${y.name}`] = {
          type: new P(c[y.name]),
          args: {
            data: {
              type: new P(a)
            }
          }
        }, d[`update${y.name}`] = {
          type: c[y.name],
          args: l
        }, d[`remove${y.name}`] = {
          type: c[y.name],
          args: {
            id: { type: new te(ne) }
          }
        }, d[`delete${y.name}`] = {
          type: c[y.name],
          args: {
            id: { type: new te(ne) }
          }
        }, d;
      },
      {}
    )
  }), m = new St({
    query: u,
    mutation: i
  }), E = Object.values(c).reduce((d, y) => {
    let t = `${d}`;
    for (const l of Object.keys(y.getFields()).filter(
      vt
    )) {
      const N = Nt(l), v = X(y.toString());
      t = `${t}
    extend type ${y} { ${N}: ${N} }
    extend type ${N} { ${v}: [${y}] }`;
    }
    return t;
  }, "");
  return E ? At(m, Dt(E)) : m;
}, Ot = (e = [], n = {}) => {
  let c = [...e];
  return n.ids ? c = c.filter((r) => n.ids.some((s) => s == r.id)) : (Object.keys(n).filter((r) => r !== "q").forEach((r) => {
    if (r.indexOf("_neq") !== -1) {
      const s = r.replace(/(_neq)$/, "");
      c = c.filter((u) => n[r] instanceof Date && typeof u[s] == "string" ? u[s] != n[r].toISOString() : u[s] != n[r]);
      return;
    }
    if (r.indexOf("_lte") !== -1) {
      const s = r.replace(/(_lte)$/, "");
      c = c.filter((u) => n[r] instanceof Date && typeof u[s] == "string" ? u[s] <= n[r].toISOString() : u[s] <= n[r]);
      return;
    }
    if (r.indexOf("_gte") !== -1) {
      const s = r.replace(/(_gte)$/, "");
      c = c.filter((u) => n[r] instanceof Date && typeof u[s] == "string" ? u[s] >= n[r].toISOString() : u[s] >= n[r]);
      return;
    }
    if (r.indexOf("_lt") !== -1) {
      const s = r.replace(/(_lt)$/, "");
      c = c.filter((u) => n[r] instanceof Date && typeof u[s] == "string" ? u[s] < n[r].toISOString() : u[s] < n[r]);
      return;
    }
    if (r.indexOf("_gt") !== -1) {
      const s = r.replace(/(_gt)$/, "");
      c = c.filter((u) => n[r] instanceof Date && typeof u[s] == "string" ? u[s] > n[r].toISOString() : u[s] > n[r]);
      return;
    }
    Array.isArray(n[r]) ? c = c.filter((s) => Array.isArray(s[r]) ? n[r].every(
      (u) => s[r].some((i) => u instanceof Date && typeof i == "string" ? i == u.toISOString() : i == u)
    ) : n[r].filter((u) => u instanceof Date && typeof s[r] == "string" ? s[r] == u.toISOString() : u == s[r]).length > 0) : c = c.filter((s) => n[r] instanceof Date && typeof s[r] == "string" ? s[r] == n[r].toISOString() : n[r] instanceof Date ? (
      // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
      +s[r] == +n[r]
    ) : (
      // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
      s[r] == n[r]
    ));
  }), n.q && (c = c.filter(
    (r) => Object.keys(r).some(
      (s) => {
        var u;
        return (u = r[s]) == null ? void 0 : u.toString().toLowerCase().includes(n.q.toLowerCase());
      }
    )
  ))), c;
}, an = (e = []) => (n, {
  sortField: c,
  sortOrder: r = "asc",
  page: s,
  perPage: u = 25,
  filter: i = {}
}) => {
  let m = [...e];
  if (c) {
    const E = r.toLowerCase() == "asc" ? 1 : -1;
    m = m.sort((d, y) => d[c] > y[c] ? E : d[c] < y[c] ? -1 * E : 0);
  }
  return m = Ot(m, i), s !== void 0 && u && (m = m.slice(s * u, s * u + u)), m;
}, cn = (e) => (n, { filter: c = {} }) => ({ count: Ot(e, c).length }), un = (e = []) => (n, { id: c }) => (
  // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
  e.find((r) => r.id == c)
), It = (e = []) => (n, c) => {
  const r = e.length > 0 ? e[e.length - 1].id + 1 : 0, s = Object.assign({}, c, { id: c.id ?? r });
  return e.push(s), s;
}, ln = (e = []) => (n, c) => c.data.map((r) => It(e)(null, r)), dn = (e = []) => (n, c) => {
  let r;
  if (c.id != null) {
    const s = c.id.toString(), u = e.findIndex(
      (i) => i.id != null && i.id.toString() === s
    );
    u !== -1 && (e[u] = Object.assign(
      {},
      e[u],
      c
    ), r = e[u]);
  }
  return r;
}, tt = (e = []) => (n, { id: c }) => {
  let r;
  if (c != null) {
    const s = c.toString(), u = e.findIndex(
      (i) => i.id != null && i.id.toString() === s
    );
    u !== -1 && (r = e.splice(u, 1)[0]);
  }
  return r;
}, pn = (e, n) => {
  const r = Object.keys(he(n[e])).filter(vt).reduce(
    (E, d) => Object.assign({}, E, {
      [Nt(d)]: (y) => n[tn(d)].find(
        (t) => (
          // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
          t.id == y[d]
        )
      )
    }),
    {}
  ), s = nn(e), u = (E) => Object.keys(he(n[E])).includes(
    s
  ), m = Object.keys(n).filter(u).reduce(
    (E, d) => Object.assign({}, E, {
      [en(d)]: (y) => n[d].filter(
        // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
        (t) => t[s] == y.id
      )
    }),
    {}
  );
  return Object.assign({}, r, m);
}, nt = (e, n) => Object.values(mt(n)).reduce(
  (c, r) => c ? !0 : Object.values(r.getFields()).reduce(
    (s, u) => s ? !0 : u.type.name == e,
    !1
  ),
  !1
), fn = (e, n) => ({
  [`all${X(e)}`]: an(n),
  [`_all${X(e)}Meta`]: cn(n),
  [e]: un(n)
}), hn = (e, n) => ({
  [`create${e}`]: It(n),
  [`createMany${e}`]: ln(n),
  [`update${e}`]: dn(n),
  [`remove${e}`]: tt(n),
  [`delete${e}`]: tt(n)
}), Tn = (e) => Object.assign(
  {},
  {
    Query: Object.keys(e).reduce(
      (n, c) => Object.assign(
        {},
        n,
        fn(z(c), e[c])
      ),
      {}
    ),
    Mutation: Object.keys(e).reduce(
      (n, c) => Object.assign(
        {},
        n,
        hn(z(c), e[c])
      ),
      {}
    )
  },
  Object.keys(e).reduce(
    (n, c) => Object.assign({}, n, {
      [z(c)]: pn(c, e)
    }),
    {}
  ),
  nt(ke, e) ? { Date: Tt } : {},
  // required because makeExecutableSchema strips resolvers from typeDefs
  nt("JSON", e) ? { JSON: ve } : {}
  // required because makeExecutableSchema strips resolvers from typeDefs
), _t = (e) => Kt({
  typeDefs: Lt(on(e)),
  resolvers: Tn(e)
});
function En(e) {
  const n = _t(e);
  return (c, r = {}) => {
    let s = r.body;
    c.requestBody && (s = c.requestBody);
    const u = JSON.parse(s);
    return Ct({
      schema: n,
      source: u.query,
      variableValues: u.variables
    }).then(
      (i) => ({
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(i)
      }),
      (i) => ({
        status: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(i)
      })
    );
  };
}
function yn({ data: e, url: n }) {
  const c = En(e);
  return {
    start() {
      re.setup(), re.post(
        n,
        (r, s) => new Promise((u) => {
          c(n, {
            body: r.body()
          }).then((i) => {
            s.status(i.status), s.headers(i.headers), s.body(i.body), u(s);
          });
        })
      ), re.use(kt);
    },
    stop() {
      re.teardown();
    },
    getHandler() {
      return c;
    }
  };
}
typeof window < "u" && (window.JsonGraphqlServer = yn, window.jsonSchemaBuilder = _t);
export {
  yn as default
};
//# sourceMappingURL=json-graphql-server.js.map
