import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import replace from '@rollup/plugin-replace';

const packageJson = require('./package.json');

const reactExternals = ['react', 'react-dom'];
const reactJsx = ['react/jsx-runtime', 'react/jsx-dev-runtime'];

// Shared plugin factory so we can include/exclude peerDepsExternal per build
const createPlugins = ({ includePeerDepsExternal }) => {
    const plugins = [];

    if (includePeerDepsExternal) {
        plugins.push(peerDepsExternal());
    }

    plugins.push(
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        resolve({
            extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
            browser: true,
            preferBuiltins: false,
            dedupe: ['react', 'react-dom']
        }),
        commonjs(),
        typescript({
            useTsconfigDeclarationDir: true,
            tsconfigOverride: {
                compilerOptions: {
                    jsx: 'react-jsx'
                }
            }
        }),
        postcss({
            extract: false,
            modules: false,
            inject: { insertAt: 'top' },
            autoModules: true,
            getExportNamed: false,
            minimize: true,
            module: {
                generateScopedName: '[name]__[local]___[hash:base64:5]'
            }
        }),
        image({ extract: 'src/assets/icons' })
    );

    return plugins;
};

export default [
    // CJS + ESM build (externalize all React entrypoints including jsx-runtime)
    {
        input: 'src/index.ts',
        external: (id) => reactExternals.includes(id) || reactExternals.some((x) => id.startsWith(`${x}/`)) || reactJsx.includes(id) || reactJsx.some((x) => id.startsWith(`${x}/`)),
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
                exports: 'named'
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: createPlugins({ includePeerDepsExternal: true })
    },
    // UMD build (bundle jsx-runtime, externalize only react/react-dom)
    {
        input: 'src/index.ts',
        // Only externalize the main react and react-dom packages for UMD
        external: (id) => id === 'react' || id === 'react-dom',
        output: {
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'OaaSWidget',
            sourcemap: true,
            exports: 'named',
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM'
            }
        },
        plugins: createPlugins({ includePeerDepsExternal: false })
    }
];
