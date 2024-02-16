/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
        // Marks Oslo dependencies as external to preven them from getting bundled
		config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
		return config;
	}
};

module.exports = nextConfig
