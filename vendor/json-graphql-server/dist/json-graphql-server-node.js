import { parse as pe, specifiedRules as te, validate as _e, getOperationAST as xe, GraphQLError as S, execute as De, GraphQLScalarType as Ae, GraphQLNonNull as $, GraphQLID as R, GraphQLList as T, GraphQLBoolean as X, GraphQLString as b, GraphQLInt as E, GraphQLFloat as z, GraphQLObjectType as C, GraphQLInputObjectType as le, isListType as Fe, GraphQLSchema as Le, extendSchema as ve, printSchema as fe } from "graphql";
import { makeExecutableSchema as $e } from "@graphql-tools/schema";
import { camelize as P, pluralize as x, singularize as k } from "inflection";
import { GraphQLJSON as W } from "graphql-type-json";
function Q(e) {
  return typeof e == "object" && e !== null;
}
function Re(e) {
  return Q(e) && ("data" in e || "data" in e && e.data == null && "errors" in e);
}
function Pe(e) {
  return typeof Object(e)[Symbol.asyncIterator] == "function";
}
function _(e) {
  if (!Array.isArray(e) || typeof e[0] != "string" && e[0] !== null || !Q(e[1]))
    return !1;
  const t = e[1];
  return !(t.status && typeof t.status != "number" || t.statusText && typeof t.statusText != "string" || t.headers && !Q(t.headers));
}
async function ne(e) {
  var t, n;
  const r = e.method;
  if (r !== "GET" && r !== "POST")
    return [
      null,
      {
        status: 405,
        statusText: "Method Not Allowed",
        headers: {
          allow: "GET, POST"
        }
      }
    ];
  const [
    s,
    o = "charset=utf-8"
    // utf-8 is assumed when not specified. this parameter is either "charset" or "boundary" (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Length)
  ] = (he(e, "content-type") || "").replace(/\s/g, "").toLowerCase().split(";"), i = {};
  switch (!0) {
    case r === "GET": {
      try {
        const [, p] = e.url.split("?"), l = new URLSearchParams(p);
        i.operationName = (t = l.get("operationName")) !== null && t !== void 0 ? t : void 0, i.query = (n = l.get("query")) !== null && n !== void 0 ? n : void 0;
        const c = l.get("variables");
        c && (i.variables = JSON.parse(c));
        const a = l.get("extensions");
        a && (i.extensions = JSON.parse(a));
      } catch {
        throw new Error("Unparsable URL");
      }
      break;
    }
    case (r === "POST" && s === "application/json" && o === "charset=utf-8"): {
      if (!e.body)
        throw new Error("Missing body");
      let p;
      try {
        const l = typeof e.body == "function" ? await e.body() : e.body;
        p = typeof l == "string" ? JSON.parse(l) : l;
      } catch {
        throw new Error("Unparsable JSON body");
      }
      if (!Q(p))
        throw new Error("JSON body must be an object");
      i.operationName = p.operationName, i.query = p.query, i.variables = p.variables, i.extensions = p.extensions;
      break;
    }
    default:
      return [
        null,
        {
          status: 415,
          statusText: "Unsupported Media Type"
        }
      ];
  }
  if (i.query == null)
    throw new Error("Missing query");
  if (typeof i.query != "string")
    throw new Error("Invalid query");
  if (i.variables != null && (typeof i.variables != "object" || Array.isArray(i.variables)))
    throw new Error("Invalid variables");
  if (i.operationName != null && typeof i.operationName != "string")
    throw new Error("Invalid operationName");
  if (i.extensions != null && (typeof i.extensions != "object" || Array.isArray(i.extensions)))
    throw new Error("Invalid extensions");
  return i;
}
function Ge(e) {
  const { schema: t, context: n, validate: r = _e, validationRules: s = [], execute: o = De, parse: i = pe, getOperationAST: p = xe, rootValue: l, onSubscribe: c, onOperation: a, formatError: f = (I) => I, parseRequestParams: A = ne } = e;
  return async function(g) {
    let d = null;
    const J = (he(g, "accept") || "*/*").replace(/\s/g, "").toLowerCase().split(",");
    for (const h of J) {
      const [w, ...F] = h.split(";"), j = (F == null ? void 0 : F.find((L) => L.includes("charset="))) || "charset=utf-8";
      if (w === "application/graphql-response+json" && j === "charset=utf-8") {
        d = "application/graphql-response+json";
        break;
      }
      if ((w === "application/json" || w === "application/*" || w === "*/*") && (j === "charset=utf-8" || j === "charset=utf8")) {
        d = "application/json";
        break;
      }
    }
    if (!d)
      return [
        null,
        {
          status: 406,
          statusText: "Not Acceptable",
          headers: {
            accept: "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8"
          }
        }
      ];
    let m;
    try {
      let h = await A(g);
      if (h || (h = await ne(g)), _(h))
        return h;
      m = h;
    } catch (h) {
      return O(h, d, f);
    }
    let u;
    const N = await (c == null ? void 0 : c(g, m));
    if (_(N))
      return N;
    if (Re(N) || ge(N))
      return O(N, d, f);
    if (N)
      u = N;
    else {
      if (!t)
        throw new Error("The GraphQL schema is not provided");
      const { operationName: h, query: w, variables: F } = m;
      let j;
      try {
        j = i(w);
      } catch (v) {
        return O(v, d, f);
      }
      const L = typeof n == "function" ? await n(g, m) : n;
      if (_(L))
        return L;
      const q = {
        operationName: h,
        document: j,
        variableValues: F,
        contextValue: L
      };
      if (typeof t == "function") {
        const v = await t(g, q);
        if (_(v))
          return v;
        u = Object.assign(Object.assign({}, q), { schema: v });
      } else
        u = Object.assign(Object.assign({}, q), { schema: t });
      let V = te;
      typeof s == "function" ? V = await s(g, u, te) : V = [...V, ...s];
      const ee = r(u.schema, u.document, V);
      if (ee.length)
        return O(ee, d, f);
    }
    let Y;
    try {
      const h = p(u.document, u.operationName);
      if (!h)
        throw null;
      Y = h.operation;
    } catch {
      return O(new S("Unable to detect operation AST"), d, f);
    }
    if (Y === "subscription")
      return O(new S("Subscriptions are not supported"), d, f);
    if (Y === "mutation" && g.method === "GET")
      return [
        JSON.stringify({
          errors: [new S("Cannot perform mutations over GET")]
        }),
        {
          status: 405,
          statusText: "Method Not Allowed",
          headers: {
            allow: "POST"
          }
        }
      ];
    if ("rootValue" in u || (u.rootValue = l), !("contextValue" in u)) {
      const h = typeof n == "function" ? await n(g, m) : n;
      if (_(h))
        return h;
      u.contextValue = h;
    }
    let G = await o(u);
    const M = await (a == null ? void 0 : a(g, u, G));
    return _(M) ? M : (M && (G = M), Pe(G) ? O(new S("Subscriptions are not supported"), d, f) : O(G, d, f));
  };
}
function O(e, t, n) {
  if (e instanceof Error && // because GraphQLError extends the Error class
  !U(e))
    return [
      JSON.stringify({ errors: [n(e)] }, H),
      {
        status: 400,
        statusText: "Bad Request",
        headers: {
          "content-type": "application/json; charset=utf-8"
        }
      }
    ];
  const r = U(e) ? [e] : ge(e) ? e : null;
  return r ? [
    JSON.stringify({ errors: r.map(n) }, H),
    Object.assign(Object.assign({}, t === "application/json" ? {
      status: 200,
      statusText: "OK"
    } : {
      status: 400,
      statusText: "Bad Request"
    }), { headers: {
      "content-type": t === "application/json" ? "application/json; charset=utf-8" : "application/graphql-response+json; charset=utf-8"
    } })
  ] : [
    JSON.stringify("errors" in e && e.errors ? Object.assign(Object.assign({}, e), { errors: e.errors.map(n) }) : e, H),
    {
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": t === "application/json" ? "application/json; charset=utf-8" : "application/graphql-response+json; charset=utf-8"
      }
    }
  ];
}
function he(e, t) {
  return typeof e.headers.get == "function" ? e.headers.get(t) : Object(e.headers)[t];
}
function ge(e) {
  return Array.isArray(e) && e.length > 0 && // if one item in the array is a GraphQLError, we're good
  e.some(U);
}
function U(e) {
  return e instanceof S;
}
function H(e, t) {
  return t instanceof Error && // GraphQL errors implement their own stringer
  !U(t) ? {
    // name: error.name, name is included in message
    message: t.message
    // stack: error.stack, can leak sensitive details
  } : t;
}
function Me(e) {
  const t = Ge(e);
  return async function(r, s) {
    try {
      const [o, i] = await t(Ve(r, s));
      s.writeHead(i.status, i.statusText, i.headers).end(o);
    } catch (o) {
      console.error("Internal error occurred during request handling. Please check your implementation.", o), s.writeHead(500).end();
    }
  };
}
function Ve(e, t) {
  return {
    url: e.url,
    method: e.method,
    headers: e.headers,
    body: () => e.body ? e.body : new Promise((n) => {
      let r = "";
      e.setEncoding("utf-8"), e.on("data", (s) => r += s), e.on("end", () => n(r));
    }),
    raw: e,
    context: { res: t }
  };
}
var Z;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(Z || (Z = {}));
const Ce = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/, ye = (e) => typeof e != "string" || !Ce.test(e) ? !1 : new Date(e).toISOString() === e, K = "Date", de = new Ae({
  name: K,
  description: "Date type",
  parseValue(e) {
    return new Date(e);
  },
  serialize(e) {
    return ye(e) ? e : e.toISOString();
  },
  parseLiteral(e) {
    if (e.kind !== Z.STRING)
      throw new S(
        `Query error: Can only parse dates strings, got a: ${e.kind}`,
        {
          nodes: [e]
        }
      );
    if (Number.isNaN(Date.parse(e.value)))
      throw new S("Query error: not a valid date", {
        nodes: [e]
      });
    return new Date(e.value);
  }
}), Qe = (e) => !Number.isNaN(Number.parseFloat(e)) && Number.isFinite(e), re = (e) => e.every(Qe), Ue = (e) => Number.isInteger(e), se = (e) => e.every(Ue), Be = (e) => typeof e == "boolean", oe = (e) => e.every(Be), Je = (e) => typeof e == "string", ie = (e) => e.every(Je), Ye = (e) => Array.isArray(e), qe = (e) => e.every(Ye), He = (e) => e instanceof Date || ye(e), Xe = (e) => e.every(He), ze = (e) => Object.prototype.toString.call(e) === "[object Object]", ae = (e) => e.every(ze), y = (e, t) => t ? new $(e) : e, me = (e, t = [], n = !1) => {
  if (e === "id" || e.substr(e.length - 3) === "_id")
    return y(R, n);
  if (t.length > 0) {
    if (qe(t)) {
      const r = t.reduce((s, o) => (o.forEach((i) => s.push(i)), s), []);
      return oe(r) ? y(
        new T(X),
        n
      ) : ie(r) ? y(
        new T(b),
        n
      ) : se(r) ? y(
        new T(E),
        n
      ) : re(r) ? y(
        new T(z),
        n
      ) : ae(r) ? y(W, n) : y(
        new T(b),
        n
      );
    }
    if (oe(t))
      return y(X, n);
    if (Xe(t))
      return y(de, n);
    if (ie(t))
      return y(b, n);
    if (se(t))
      return y(E, n);
    if (re(t))
      return y(z, n);
    if (ae(t))
      return y(W, n);
  }
  return y(b, n);
}, Te = (e) => e.reduce((t, n) => {
  for (const r of Object.keys(n))
    t[r] || (t[r] = []), n[r] != null && t[r].push(n[r]);
  return t;
}, {}), B = (e, t = !0) => {
  const n = Te(e), r = e.length;
  return Object.keys(n).reduce(
    (s, o) => (s[o] = {
      type: me(
        o,
        n[o],
        t ? n[o].length === r : !1
      )
    }, s),
    {}
  );
}, We = (e) => P(e), D = (e) => P(k(e)), Ze = (e) => x(e.substr(0, e.length - 3)), ke = (e) => `${k(e)}_id`, Oe = (e) => D(e.substr(0, e.length - 3)), Ke = (e) => Object.keys(e).map((t) => ({
  name: P(k(t)),
  fields: B(e[t])
})).map((t) => new C(t)), et = (e) => {
  const t = Te(e);
  return Object.keys(t).reduce((n, r) => {
    const s = me(
      r,
      t[r],
      !1
    );
    return Fe(s) || ((s === E || s === z || s === b || s.name === K) && (n[`${r}_lt`] = { type: s }, n[`${r}_lte`] = { type: s }, n[`${r}_gt`] = { type: s }, n[`${r}_gte`] = { type: s }), s !== X && (n[`${r}_neq`] = { type: s })), n;
  }, {});
}, Ee = (e) => Object.keys(e).reduce(
  (t, n) => Object.assign({}, t, {
    [D(n)]: new le({
      name: `${D(n)}Filter`,
      fields: Object.assign(
        {
          q: { type: b }
        },
        {
          ids: { type: new T(R) }
        },
        B(e[n], !1),
        et(e[n])
      )
    })
  }),
  {}
), be = (e) => e.endsWith("_id"), Ie = (e) => {
  const t = Ke(e), n = t.reduce(
    (c, a) => (c[a.name] = a, c),
    {}
  ), r = Ee(e), s = new C({
    name: "ListMetadata",
    fields: {
      count: { type: E }
    }
  }), o = new C({
    name: "Query",
    fields: t.reduce(
      (c, a) => (c[a.name] = {
        type: n[a.name],
        args: {
          id: { type: new $(R) }
        }
      }, c[`all${P(x(a.name))}`] = {
        type: new T(n[a.name]),
        args: {
          page: { type: E },
          perPage: { type: E },
          sortField: { type: b },
          sortOrder: { type: b },
          filter: { type: r[a.name] }
        }
      }, c[`_all${P(x(a.name))}Meta`] = {
        type: s,
        args: {
          page: { type: E },
          perPage: { type: E },
          filter: { type: r[a.name] }
        }
      }, c),
      {}
    )
  }), i = new C({
    name: "Mutation",
    fields: t.reduce(
      (c, a) => {
        const f = n[a.name].getFields(), A = Object.keys(f).reduce(
          (m, u) => (m[u] = Object.assign(
            {},
            f[u],
            {
              type: u !== "id" && f[u].type instanceof $ ? f[u].type.ofType : f[u].type
            }
          ), m),
          {}
        ), { id: I, ...g } = f, d = Object.keys(g).reduce(
          (m, u) => (m[u] = Object.assign(
            {},
            g[u]
          ), delete m[u].resolve, m),
          {}
        ), J = new le({
          name: `${a.name}Input`,
          fields: d
        });
        return c[`create${a.name}`] = {
          type: n[a.name],
          args: g
        }, c[`createMany${a.name}`] = {
          type: new T(n[a.name]),
          args: {
            data: {
              type: new T(J)
            }
          }
        }, c[`update${a.name}`] = {
          type: n[a.name],
          args: A
        }, c[`remove${a.name}`] = {
          type: n[a.name],
          args: {
            id: { type: new $(R) }
          }
        }, c[`delete${a.name}`] = {
          type: n[a.name],
          args: {
            id: { type: new $(R) }
          }
        }, c;
      },
      {}
    )
  }), p = new Le({
    query: o,
    mutation: i
  }), l = Object.values(n).reduce((c, a) => {
    let f = `${c}`;
    for (const A of Object.keys(a.getFields()).filter(
      be
    )) {
      const I = Oe(A), g = x(a.toString());
      f = `${f}
    extend type ${a} { ${I}: ${I} }
    extend type ${I} { ${g}: [${a}] }`;
    }
    return f;
  }, "");
  return l ? ve(p, pe(l)) : p;
}, Ne = (e = [], t = {}) => {
  let n = [...e];
  return t.ids ? n = n.filter((r) => t.ids.some((s) => s == r.id)) : (Object.keys(t).filter((r) => r !== "q").forEach((r) => {
    if (r.indexOf("_neq") !== -1) {
      const s = r.replace(/(_neq)$/, "");
      n = n.filter((o) => t[r] instanceof Date && typeof o[s] == "string" ? o[s] != t[r].toISOString() : o[s] != t[r]);
      return;
    }
    if (r.indexOf("_lte") !== -1) {
      const s = r.replace(/(_lte)$/, "");
      n = n.filter((o) => t[r] instanceof Date && typeof o[s] == "string" ? o[s] <= t[r].toISOString() : o[s] <= t[r]);
      return;
    }
    if (r.indexOf("_gte") !== -1) {
      const s = r.replace(/(_gte)$/, "");
      n = n.filter((o) => t[r] instanceof Date && typeof o[s] == "string" ? o[s] >= t[r].toISOString() : o[s] >= t[r]);
      return;
    }
    if (r.indexOf("_lt") !== -1) {
      const s = r.replace(/(_lt)$/, "");
      n = n.filter((o) => t[r] instanceof Date && typeof o[s] == "string" ? o[s] < t[r].toISOString() : o[s] < t[r]);
      return;
    }
    if (r.indexOf("_gt") !== -1) {
      const s = r.replace(/(_gt)$/, "");
      n = n.filter((o) => t[r] instanceof Date && typeof o[s] == "string" ? o[s] > t[r].toISOString() : o[s] > t[r]);
      return;
    }
    Array.isArray(t[r]) ? n = n.filter((s) => Array.isArray(s[r]) ? t[r].every(
      (o) => s[r].some((i) => o instanceof Date && typeof i == "string" ? i == o.toISOString() : i == o)
    ) : t[r].filter((o) => o instanceof Date && typeof s[r] == "string" ? s[r] == o.toISOString() : o == s[r]).length > 0) : n = n.filter((s) => t[r] instanceof Date && typeof s[r] == "string" ? s[r] == t[r].toISOString() : t[r] instanceof Date ? (
      // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
      +s[r] == +t[r]
    ) : (
      // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
      s[r] == t[r]
    ));
  }), t.q && (n = n.filter(
    (r) => Object.keys(r).some(
      (s) => {
        var o;
        return (o = r[s]) == null ? void 0 : o.toString().toLowerCase().includes(t.q.toLowerCase());
      }
    )
  ))), n;
}, tt = (e = []) => (t, {
  sortField: n,
  sortOrder: r = "asc",
  page: s,
  perPage: o = 25,
  filter: i = {}
}) => {
  let p = [...e];
  if (n) {
    const l = r.toLowerCase() == "asc" ? 1 : -1;
    p = p.sort((c, a) => c[n] > a[n] ? l : c[n] < a[n] ? -1 * l : 0);
  }
  return p = Ne(p, i), s !== void 0 && o && (p = p.slice(s * o, s * o + o)), p;
}, nt = (e) => (t, { filter: n = {} }) => ({ count: Ne(e, n).length }), rt = (e = []) => (t, { id: n }) => (
  // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
  e.find((r) => r.id == n)
), Se = (e = []) => (t, n) => {
  const r = e.length > 0 ? e[e.length - 1].id + 1 : 0, s = Object.assign({}, n, { id: n.id ?? r });
  return e.push(s), s;
}, st = (e = []) => (t, n) => n.data.map((r) => Se(e)(null, r)), ot = (e = []) => (t, n) => {
  let r;
  if (n.id != null) {
    const s = n.id.toString(), o = e.findIndex(
      (i) => i.id != null && i.id.toString() === s
    );
    o !== -1 && (e[o] = Object.assign(
      {},
      e[o],
      n
    ), r = e[o]);
  }
  return r;
}, ce = (e = []) => (t, { id: n }) => {
  let r;
  if (n != null) {
    const s = n.toString(), o = e.findIndex(
      (i) => i.id != null && i.id.toString() === s
    );
    o !== -1 && (r = e.splice(o, 1)[0]);
  }
  return r;
}, it = (e, t) => {
  const r = Object.keys(B(t[e])).filter(be).reduce(
    (l, c) => Object.assign({}, l, {
      [Oe(c)]: (a) => t[Ze(c)].find(
        (f) => (
          // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
          f.id == a[c]
        )
      )
    }),
    {}
  ), s = ke(e), o = (l) => Object.keys(B(t[l])).includes(
    s
  ), p = Object.keys(t).filter(o).reduce(
    (l, c) => Object.assign({}, l, {
      [We(c)]: (a) => t[c].filter(
        // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
        (f) => f[s] == a.id
      )
    }),
    {}
  );
  return Object.assign({}, r, p);
}, ue = (e, t) => Object.values(Ee(t)).reduce(
  (n, r) => n ? !0 : Object.values(r.getFields()).reduce(
    (s, o) => s ? !0 : o.type.name == e,
    !1
  ),
  !1
), at = (e, t) => ({
  [`all${x(e)}`]: tt(t),
  [`_all${x(e)}Meta`]: nt(t),
  [e]: rt(t)
}), ct = (e, t) => ({
  [`create${e}`]: Se(t),
  [`createMany${e}`]: st(t),
  [`update${e}`]: ot(t),
  [`remove${e}`]: ce(t),
  [`delete${e}`]: ce(t)
}), we = (e) => Object.assign(
  {},
  {
    Query: Object.keys(e).reduce(
      (t, n) => Object.assign(
        {},
        t,
        at(D(n), e[n])
      ),
      {}
    ),
    Mutation: Object.keys(e).reduce(
      (t, n) => Object.assign(
        {},
        t,
        ct(D(n), e[n])
      ),
      {}
    )
  },
  Object.keys(e).reduce(
    (t, n) => Object.assign({}, t, {
      [D(n)]: it(n, e)
    }),
    {}
  ),
  ue(K, e) ? { Date: de } : {},
  // required because makeExecutableSchema strips resolvers from typeDefs
  ue("JSON", e) ? { JSON: W } : {}
  // required because makeExecutableSchema strips resolvers from typeDefs
), je = (e) => $e({
  typeDefs: fe(Ie(e)),
  resolvers: we(e)
}), yt = (e) => ({
  typeDefs: fe(Ie(e)),
  resolvers: we(e)
}), ut = (e, t) => (t.writeHead(200, void 0, {
  "Content-Type": "text/html; charset=utf-8"
}), t.end(
  pt({
    endpoint: "/graphql"
  })
)), pt = ({ endpoint: e }) => `
<!--
 *  Copyright (c) 2021 GraphQL Contributors
 *  All rights reserved.
 * Copy of https://github.com/graphql/graphiql/blob/main/examples/graphiql-cdn/index.html
 * https://github.com/graphql/graphiql
 * https://github.com/graphql/graphiql/blob/main/LICENSE
-->
<!doctype html>
<html lang="en">
  <head>
    <title>GraphiQL</title>
    <style>
      body {
        height: 100%;
        margin: 0;
        width: 100%;
        overflow: hidden;
      }

      #graphiql {
        height: 100vh;
      }
    </style>
    <script
      crossorigin
      src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"
    ><\/script>
    <script
      crossorigin
      src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"
    ><\/script>
    <!--
      These two files can be found in the npm module, however you may wish to
      copy them directly into your environment, or perhaps include them in your
      favored resource bundler.
     -->
    <script
      src="https://cdn.jsdelivr.net/npm/graphiql/graphiql.min.js"
      type="application/javascript"
    ><\/script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/graphiql/graphiql.min.css" />
    <!-- 
      These are imports for the GraphIQL Explorer plugin.
     -->
    <script
      src="https://cdn.jsdelivr.net/npm/@graphiql/plugin-explorer/dist/index.umd.js"
      crossorigin
    ><\/script>

    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@graphiql/plugin-explorer/dist/style.css"
    />
  </head>

  <body>
    <div id="graphiql">Loading...</div>
    <script>
      const root = ReactDOM.createRoot(document.getElementById('graphiql'));
      const fetcher = GraphiQL.createFetcher({
        url: '${e}',
      });
      const explorerPlugin = GraphiQLPluginExplorer.explorerPlugin();
      root.render(
        React.createElement(GraphiQL, {
          fetcher,
          defaultEditorToolsVisibility: true,
          plugins: [explorerPlugin],
        }),
      );
    <\/script>
  </body>
</html>`, dt = (e) => {
  const t = Me({
    schema: je(e)
  });
  return (r, s, o) => r.is("application/json") ? t(r, s, o) : ut(r, s);
}, mt = je;
export {
  dt as default,
  yt as getPlainSchema,
  dt as jsonGraphqlExpress,
  mt as jsonSchemaBuilder
};
//# sourceMappingURL=json-graphql-server-node.js.map
