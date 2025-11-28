const supabase = require('./superbaseClient');

const testConnection = async (req, res) => {
  try {
    // Query system table pg_tables (always exists)
    const { data, error } = await supabase
      .from('pg_tables')
      .select('schemaname, tablename')
      .limit(1); // just check one row

    if (error) {
      return res.json({
        connected: false,
        error: error.message,
      });
    }

    res.json({
      connected: true,
      message: 'Supabase connection successful!',
      sampleData: data,
    });
  } catch (err) {
    res.json({
      connected: false,
      error: err.message,
    });
  }
};

module.exports = { testConnection };



