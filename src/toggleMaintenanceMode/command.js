import SiteClient from '../site/SiteClient';
import ApiException from '../ApiException';

export default async function toggleMaintenanceMode({ activate, token: tokenByArg, force, cmaBaseUrl }) {
  const token = tokenByArg || process.env.DATO_MANAGEMENT_API_TOKEN;
  const client = new SiteClient(token, {}, cmaBaseUrl);

  const { active } = await client.maintenanceMode.find();

  if (activate) {
    if (active) {
      process.stdout.write('Maintenance mode is already active!\n');
      return;
    }

    const params = force ? { force: true } : {}

    try {
      await client.maintenanceMode.activate(params);
    } catch(e) {
      if (e instanceof ApiException) {
        const error = e.errorWithCode('ACTIVE_EDITING_SESSIONS');

        if (error) {
          process.stderr.write('Cannot activate maintenance mode as some users are currently editing records!\n');
          process.stderr.write('To proceed anyway, please use the --force flag\n');
          process.exit(1);
        }
      }

      throw e;
    }

    process.stdout.write('Maintenance mode activated: the primary environment is now read-only\n');
  } else {
    if (!active) {
      process.stdout.write('Maintenance mode is already deactivated!\n');
      return;
    }

    await client.maintenanceMode.deactivate();
    process.stdout.write('Maintenance mode deactivated\n');
  }
}