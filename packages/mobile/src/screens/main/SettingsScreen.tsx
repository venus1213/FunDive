import { StyleSheet, View, Text, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export const SettingsScreen = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* 通知設定 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>通知設定</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>プッシュ通知</Text>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
            thumbColor={pushEnabled ? '#2563eb' : '#f3f4f6'}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>メール通知</Text>
          <Switch
            value={emailEnabled}
            onValueChange={setEmailEnabled}
            trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
            thumbColor={emailEnabled ? '#2563eb' : '#f3f4f6'}
          />
        </View>
      </View>

      {/* アプリ設定 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>アプリ設定</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>ダークモード</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
            thumbColor={darkMode ? '#2563eb' : '#f3f4f6'}
          />
        </View>
      </View>

      {/* その他 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>その他</Text>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>利用規約</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>プライバシーポリシー</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>お問い合わせ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>アプリについて</Text>
          <Text style={styles.version}>バージョン 1.0.0</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  settingLabel: {
    fontSize: 16,
    color: '#111827',
  },
  link: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  linkText: {
    fontSize: 16,
    color: '#111827',
  },
  version: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
}); 