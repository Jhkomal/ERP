/**
 * Utility to generate unique test data for each automation script run
 */

class DataGenerator {
  /**
   * Generate a unique email address based on company name in yopmail.com format
   * @param {string} companyName - The company name to base the email on
   * @returns {string} Unique email address
   */
  static generateUniqueEmail(companyName) {
    const randomNum = Math.floor(Math.random() * 100);
    const emailName = companyName.toLowerCase().replace(/\s+/g, '-');
    return `${emailName}${randomNum}@yopmail.com`;
  }

  /**
   * Generate a random company name without numbers
   * @returns {string} Random company name
   */
  static generateUniqueCompanyName() {
    const adjectives = ['Swift', 'Cloud', 'Digital', 'Smart', 'Nexus', 'Apex', 'Prime', 'Quantum', 'Zenith', 'Fusion', 'Nova', 'Pulse', 'Vertex', 'Summit', 'Horizon', 'Bright', 'Dynamic', 'Epic', 'Global', 'Iconic', 'Rapid', 'Stellar', 'Turbo', 'Ultimate', 'Vibrant', 'Wise', 'Xcel', 'Yield', 'Zest', 'Alpha', 'Beta', 'Cyber', 'Eon', 'Flex', 'Giga', 'Hexa', 'Infinite', 'Jetty', 'Kilo', 'Logic', 'Mega', 'Nexo', 'Omni', 'Pixel', 'Quantum', 'Relay', 'Synergy', 'Titan', 'Ultra', 'Vortex', 'Warp'];
    const nouns = ['Systems', 'Solutions', 'Technologies', 'Innovations', 'Ventures', 'Labs', 'Hub', 'Works', 'Pro', 'Plus', 'Max', 'Elite', 'Group', 'Corp', 'Dynamics', 'Forge', 'Engine', 'Core', 'Platform', 'Cloud', 'Network', 'Stream', 'Grid', 'Sphere', 'Matrix', 'Pulse', 'Edge', 'Nexus', 'Portal', 'Realm', 'Shift', 'Sync', 'Tide', 'Unified', 'Vision', 'Wave', 'Xpress', 'Yield', 'Zone', 'Archive', 'Bridge', 'Catalyst', 'Dimension', 'Evolution', 'Frontier', 'Gateway', 'Horizon', 'Integration', 'Junction', 'Keeper'];
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(Math.random() * 999);
    
    return `${randomAdjective} ${randomNoun} ${randomNum}`.trim();
  }

  /**
   * Generate a unique workspace name (URL-friendly format)
   * @returns {string} Unique workspace name in format: workspace-name-randomid
   */
  static generateUniqueWorkspace() {
    const workspaceNames = ['apex', 'blitz', 'cyber', 'delta', 'echo', 'forge', 'glitch', 'helix', 'infini', 'jetway', 'krypton', 'lambda', 'matrix', 'neuron', 'omega', 'phoenix', 'quantum', 'relay', 'spectra', 'titan', 'ultra', 'vertex', 'wave', 'xenith', 'yaxis', 'zenith'];
    const randomName = workspaceNames[Math.floor(Math.random() * workspaceNames.length)];
    const timestamp = Date.now().toString().slice(-6);
    const randomId = Math.floor(Math.random() * 9999);
    
    return `${randomName}-${randomId}-${timestamp}`;
  }

  /**
   * Generate test data with unique email and company name
   * @returns {object} Test data object with email, company name, workspace, and fixed password
   */
  static generateTestData() {
    const companyName = this.generateUniqueCompanyName();
    
    return {
      email: this.generateUniqueEmail(companyName),
      companyName: companyName,
      workspace: this.generateUniqueWorkspace(),
      password: 'Password@123',
    };
  }
}

export default DataGenerator;
