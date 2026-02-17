module.exports = {
    apps: [{
        name: 'about-c-platform',
        script: 'npm',
        args: 'start',
        cwd: '/home/ubuntu/cert-platform', // UPDATE THIS PATH
        instances: 2,
        exec_mode: 'cluster',
        watch: false,
        max_memory_restart: '1G',
        env_production: {
            NODE_ENV: 'production',
            PORT: 3000
        },
        error_file: './logs/err.log',
        out_file: './logs/out.log',
        log_file: './logs/combined.log',
        time: true,
        merge_logs: true,
        autorestart: true,
        max_restarts: 10,
        restart_delay: 4000
    }]
};
